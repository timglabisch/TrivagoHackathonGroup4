pevent = require './pevent.coffee'

module.exports = class

  constructor: ->
    pevent.addPeventMixinTo @
    @users = {}

  add: (user) ->
    @users[user.getUuid()] = user
    console.log "Connect " + user.getUuid()

  remove: (user) ->
    delete @users[user.getUuid()]
    console.log "Disconnect " + user.getUuid()

  each: (cb) ->
    cb u for k, u of @users



