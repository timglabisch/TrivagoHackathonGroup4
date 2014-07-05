pevent = require './pevent.coffee'

module.exports = class

  constructor: ->
    pevent.addPeventMixinTo @
    @users = []

  add: (user) ->
    @users[user.getUuid()] = user
    user.on 'position', @onPositionUpdate.bind @
    console.log "Connect " + user.getUuid()

  remove: (user) ->
    delete @users[user.getUuid()]
    console.log "Disconnect " + user.getUuid()

  onPositionUpdate: (user) ->
    @emit 'position', user



