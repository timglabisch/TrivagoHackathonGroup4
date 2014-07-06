socket = io();

class notify
  constructor: (@headline, @txt, @cb) ->
    @dom = null

  getDom: ->
    return @dom if @dom
    @dom = $ """
      <div class="notify">
          <div class="headline">
              """ + @headline + """
          </div>
          <div class="txt">
              """ + @txt + """
          </div>
      </div>
    """

    @dom

  triggerCb: (cbName) ->
    console.log "trigger" + cbName
    @cb[cbName]()


class watch
  constructor: (@dom) ->
    @notify = null

  setNotify: (@notify) ->
    @dom.html @notify.getDom()



class main
  constructor: (@dom) ->
    @watch = new watch @dom.find('.notifyWrapper')
    @dom.click => @watch.notify?.triggerCb 'click'
    @socket = null

  provideGeo: (cb) ->
    throw "cant get geolocation" if !navigator.geolocation
    navigator.geolocation.getCurrentPosition (pos) -> cb lat: pos.coords.latitude, long: pos.coords.latitude

  onGetOffer: (data) ->
    @watch.setNotify new notify("Offer", JSON.stringify data, click: => @acceptOffer());

  acceptOffer: (offer) ->
    socket.emit "accept_offer", JSON.stringify {"backend_user_uuid": offer.backend_user_uuid}
    @watch.setNotify new notify("Danke!", offer.backend_user_uuid);

  run: ->
    @watch.setNotify new notify("Bitte warten", "Geodaten werden <br/> abgerufen", click: -> console.log "click wait")
    @provideGeo (coords) =>
      @watch.setNotify new notify("alles klar.", "Warte auf angebote", click: -> console.log "click wait")
      socket.emit "position", JSON.stringify coords
      socket.on 'offer', @onGetOffer.bind @


$(document).ready -> (new main $('.main')).run()