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
    @userManager.on 'accept_offer', @onAcceptOffer.bind @
    @backendUserManager.on 'sendOffer', @sendOfferToUser.bind @

  sendDisconnectUsersToBackends: ->
    @backendUserManager.each (backendUser) =>
      @userManager.each (user) =>
        backendUser.send 'user_disconnect', user.getUuid()

  sendUpdateToBackends: (user) ->
    @backendUserManager.each (backendUser) =>
      console.log "broadcast to " + backendUser.getUuid()
      @sendUserToBackendUser backendUser, user

  sendUserToBackendUser: (backendUser, user) ->
    backendUser.send 'position',
      uuid: user.getUuid()
      lat: user.getLat()
      long: user.getLong()
      status: user.getStatus()
      persons: user.getPersons()
      rating: user.getRating()
      offers: user.getOffers()

  onAcceptOffer: (user, offer) ->
    backendUser = @backendUserManager.users[offer.backend_user_uuid]
    return console.log "cant send offer to unknown user " + @offer.backend_user_uuid +"." if !backendUser
    console.log "offer accepted"
    user.removeOffers()
    backendUser.send 'offer_accepted', {user_uuid: user.getUuid()}

  sendOfferToUser: (backendUser, offer) ->
    console.log "transfer offer: " + JSON.stringify offer
    user = @userManager.users[offer.user_uuid]
    user.addOffer backendUser, offer
    return console.log "cant send offer to unknown user " + @offer.user_uuid +"." if !user
    console.log "send offer to " + offer.user_uuid
    user.send 'offer', offer

  # send everything to the backend
  syncBackend: (backendUser) ->
    @userManager.each (user) =>
      @sendUserToBackendUser backendUser, user

  run: ->
    io.on 'connection', @onUserConnection.bind(@)
    io_backend.on 'connection', @onBackendConnection.bind(@)

  onUserConnection: (socket) ->
    user = new _user parseInt(Math.random() * 100000), socket

    @userManager.add user
    user.on 'disconnect', (user) =>
      @sendDisconnectUsersToBackends user
      @userManager.remove user

  onBackendConnection: (socket) ->
    backendUser = new _backendUser parseInt(Math.random() * 100000), socket

    @backendUserManager.add backendUser
    backendUser.on 'disconnect', (user) =>
      # tidy up offers
      @userManager.each (user) => user.removeOffer backendUser
      @backendUserManager.remove backendUser

    @syncBackend backendUser

(new main).run()


