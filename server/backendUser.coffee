pevent = require './pevent.coffee'

module.exports = class

  constructor: (@uuid, @socket) ->
    pevent.addPeventMixinTo @
    socket.on 'disconnect', @onDisconnect.bind @

  send: (channel, data) ->
    @socket.emit channel, data

  getUuid: -> @uuid

  onDisconnect: ->
    console.log 'backendUser ' + @getUuid() + " disconnect"
    @emit 'disconnect', @