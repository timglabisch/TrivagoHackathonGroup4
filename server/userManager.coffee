pevent = require './pevent.coffee'

module.exports = class

  constructor: ->
    pevent.addPeventMixinTo @
    @users = {}

  add: (user) ->
    @users[user.getUuid()] = user
    user.on 'position', => @emit 'position', user
    user.on 'request', => @emit 'request', user
      
    console.log "Connect " + user.getUuid()

  remove: (user) ->
    delete @users[user.getUuid()]
    console.log "Disconnect " + user.getUuid()




