pevent = require './pevent.coffee'

module.exports = class

  status: 0
  persons: 0
  rating: 0

  constructor: (@uuid, @socket) ->
    pevent.addPeventMixinTo @
    socket.on 'msg', (msg) => console.log @getUuid() + " " + msg
    socket.on 'request', @onRequest.bind @
    socket.on 'position', @onPosition.bind @
    socket.on 'disconnect', @onDisconnect.bind @

  onDisconnect: ->
    console.log @getUuid() + " disconnect"
    @emit 'disconnect', @

  onRequest: (jsonMsg) ->
    try request = JSON.parse jsonMsg
    catch
      return @handleParsingError jsonMsg

    console.log "request.persons missing" if !request.persons
    console.log "request.rating missing" if !request.rating
    console.log "request.status missing" if !request.status

    @setPersons request.persons
    @setRating request.rating
    @setStatus request.status
    @emit "request", @

  send: (channel, data) ->
    @socket.emit channel, data

  onPosition: (jsonMsg) ->
    try request = JSON.parse jsonMsg
    catch
      return @handleParsingError jsonMsg

    console.log "position update requires long" if !request.long
    console.log "position update requires lat" if !request.lat

    @setLong request.long
    @setLat request.lat
    console.log "c:" + @getUuid() + " now at lat:" + @getLat() + " long:" + @getLong()
    @emit "position", @

  handleParsingError: (msg) ->
    console.log "ERROR: (c: " + @getUuid() + ") cant parse msg";
    console.log jsonMsg
    console.log "-------"
    @emit 'error', "can't parse msg."

  setLat: (@lat) ->

  getLat: -> @lat

  setLong: (@long) ->

  getLong: -> @long

  getUuid: -> @uuid

  setStatus: (@status) ->

  getStatus: -> @status

  setRating: (@rating) ->

  getRating: -> @rating

  setPersons: (@persons) ->

  getPersons: -> @persons
