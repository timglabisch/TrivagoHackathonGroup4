app = require('express')();
app_backend = require('express')();
http = require('http').Server(app);
http_backend = require('http').Server(app_backend);
io = require('socket.io')(http);
io_backend = require('socket.io')(http_backend);
_user = require('./user.coffee')
_backendUser = require('./backendUser.coffee')
_userManager = require('./userManager.coffee')
_backendUserManager = require('./backendUserManager.coffee')

http.listen 3000, -> console.log 'listening on *:3000'
http_backend.listen 3001, -> console.log 'backend on *:3001'

app.get '/', (req, res) -> res.sendfile 'index.html'
app_backend.get '/', (req, res) -> res.sendfile 'index_backend.html'

class main

  constructor: ->
    @userManager = new _userManager
    @backendUserManager = new _backendUserManager

    @userManager.on 'position', @sendUpdateToBackends.bind @
    @userManager.on 'request', @sendUpdateToBackends.bind @

  sendUpdateToBackends: (user) ->
    @backendUserManager.each (backendUser) ->
      console.log "broadcast to " + backendUser.getUuid()
      backendUser.send 'position',
        uuid: user.getUuid()
        lat: user.getLat()
        long: user.getLong()
        status: user.getStatus()
        persons: user.getPersons()
        rating: user.getRating()


  run: ->
    io.on 'connection', @onUserConnection.bind(@)
    io_backend.on 'connection', @onBackendConnection.bind(@)

  onUserConnection: (socket) ->
    user = new _user parseInt(Math.random() * 100000), socket

    @userManager.add user
    user.on 'disconnect', (user) => @userManager.remove user

  onBackendConnection: (socket) ->
    user = new _backendUser parseInt(Math.random() * 100000), socket

    @backendUserManager.add user
    user.on 'disconnect', (user) => @backendUserManager.remove user

(new main).run()


