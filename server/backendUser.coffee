pevent = require './pevent.coffee'

module.exports = class

  constructor: (@uuid, @socket) ->
    pevent.addPeventMixinTo @
    socket.on 'disconnect', @onDisconnect.bind @
    socket.on 'sendOffer', @onSendOffer.bind @

  send: (channel, data) ->
    @socket.emit channel, data

  onSendOffer: (jsonMsg) ->
    try request = JSON.parse jsonMsg
    catch
      return @handleParsingError jsonMsg

    return console.log ".user_uuid missing" if !request.user_uuid
    return console.log "offer .price is missing" if !request.price
    request.backend_user_uuid = @getUuid()

    console.log "sendOffer"

    @emit 'sendOffer', request

  getUuid: -> @uuid

  onDisconnect: ->
    console.log 'backendUser ' + @getUuid() + " disconnect"
    @emit 'disconnect', @