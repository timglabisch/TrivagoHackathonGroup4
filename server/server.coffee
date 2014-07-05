app = require('express')();
app_backend = require('express')();
http = require('http').Server(app);
http_backend = require('http').Server(app_backend);
io = require('socket.io')(http);
io_backend = require('socket.io')(http_backend);
_user = require('./user.coffee')
_userManager = require('./userManager.coffee')

http.listen 3000, -> console.log 'listening on *:3000'
http_backend.listen 3001, -> console.log 'backend on *:3001'

app.get '/', (req, res) -> res.sendfile 'index.html'
app_backend.get '/', (req, res) -> res.sendfile 'index_backend.html'

class main

  constructor: ->
    @userManager = new _userManager

  run: ->
    io.on 'connection', @onUserConnection.bind(@)
    io_backend.on 'connection', @onBackendConnection.bind(@)

  onUserConnection: (socket) ->
    user = new _user parseInt(Math.random() * 100000), socket

    @userManager.add user
    user.on 'disconnect', (user) => @userManager.remove user

  onBackendConnection: (socket) ->
    socket.emit 'foo', "hello"
    console.log "backend connection"
    @userManager.on 'position', (user) =>
      console.log "broadcast position"
      socket.emit 'position', { uuid: user.getUuid(), lat: user.getLat(), long: user.getLong() }

(new main).run()


