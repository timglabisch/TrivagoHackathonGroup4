'use strict';

/**
 * @ngdoc overview
 * @name frontendApp
 * @description
 * # frontendApp
 *
 * Main module of the application.
 */
angular

  .module('frontendApp', ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ngRoute', 'google-maps', 'ngGeolocation'])

  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/offer', {
          templateUrl: 'views/offer.html',
          controller: 'OfferCtrl'
      })
      .when('/offer_accepted', {
          templateUrl: 'views/offer_accepted.html',
          controller: 'OfferAccepted'
      })
      .when('/offer/:id', {
          templateUrl: 'views/details.html',
          controller: 'DetailsCtrl'
      })
      .when('/offer/:id/book', {
          templateUrl: 'views/booking.html',
          controller: 'BookingCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })

  .run(function($rootScope, $geolocation) {
        $geolocation.watchPosition({
            timeout: 60000,
            maximumAge: 250,
            enableHighAccuracy: true
        });

        $rootScope.position = $geolocation.position;

        $rootScope.hotels = [
            {"name":"Hotel Nikko D\u00fcsseldorf","0":true,"longitude":"6.7884","latitude":"51.22309","rating":3.8,"place_id":"ChIJO5sptzrKuEcRju-J-azY_HI","price":100,"img":"ChIJO5sptzrKuEcRju-J-azY_HI.jpg"},{"name":"Breidenbacher Hof, a Capella Hotel","0":true,"longitude":"6.777759","latitude":"51.225498","rating":4.4,"place_id":"ChIJL198miLKuEcR8-vP1kts4bM","price":110,"img":"ChIJL198miLKuEcR8-vP1kts4bM.jpg"},{"name":"Steigenberger Parkhotel","0":true,"longitude":"6.777922","latitude":"51.226734","rating":4.1,"place_id":"ChIJU4F0iyLKuEcRQtob67qx2BQ","price":120,"img":"ChIJU4F0iyLKuEcRQtob67qx2BQ.jpg"},{"name":"Hotel Am Rathaus","0":true,"longitude":"6.772385","latitude":"51.226126","rating":null,"place_id":"ChIJVwxo6xnKuEcRJXZN1Ekdrzg","price":130,"img":"ChIJVwxo6xnKuEcRJXZN1Ekdrzg.jpg"},{"name":"Altstadthotel St. Georg","0":true,"longitude":"6.775395","latitude":"51.226392","rating":null,"place_id":"ChIJS0-9ZxjKuEcRQNnT7ZQrhKA","price":140,"img":"ChIJS0-9ZxjKuEcRQNnT7ZQrhKA.jpg"},{"name":"Courtyard Duesseldorf Seestern","0":true,"longitude":"6.738782","latitude":"51.242233","rating":3.8,"place_id":"ChIJ_cv_0gi2uEcR86JJr0rWfH0","price":150,"img":"ChIJ_cv_0gi2uEcR86JJr0rWfH0.jpg"},{"name":"Gut Dyckhof Hotel \u0026 Restaurant","0":true,"longitude":"6.682793","latitude":"51.241746","rating":4.6,"place_id":"ChIJ8c3RuZ22uEcRbsiKZMtvqNo","price":160,"img":null},{"name":"Sheraton D\u00fcsseldorf Airport Hotel","0":true,"longitude":"6.768104","latitude":"51.278263","rating":3.7,"place_id":"ChIJzwY4JivIuEcR5z28eb_wMJ8","price":170,"img":"ChIJzwY4JivIuEcR5z28eb_wMJ8.jpg"},{"name":"Carathotel D\u00fcsseldorf Altstadt","0":true,"longitude":"6.773146","latitude":"51.222956","rating":4.4,"place_id":"ChIJ99cuCRfKuEcRlbte_jIRBOI","price":180,"img":"ChIJ99cuCRfKuEcRlbte_jIRBOI.jpg"},{"name":"Hotel Ibis Duesseldorf Hauptbahnhof","0":true,"longitude":"6.793206","latitude":"51.220565","rating":3.8,"place_id":"ChIJLxHU_TDKuEcRSBm0tnPxyyQ","price":190,"img":null},{"name":"Best Western Savoy Hotel D\u00fcsseldorf","0":true,"longitude":"6.785318","latitude":"51.220884","rating":3.8,"place_id":"ChIJseIjrDvKuEcR_rNKYJ-nGzo","price":200,"img":"ChIJseIjrDvKuEcR_rNKYJ-nGzo.jpg"},{"name":"FFFZ Hotel Und Tagungshaus","0":true,"longitude":"6.75237","latitude":"51.26378","rating":null,"place_id":"ChIJ536hGSS2uEcRH6pnRnjC3v8","price":210,"img":null},{"name":"A\u0026O Duesseldorf Hauptbahnhof Hotel","0":true,"longitude":"6.782393","latitude":"51.216373","rating":4,"place_id":"ChIJ-bOAJznKuEcREwNsQXYoIyo","price":220,"img":"ChIJ-bOAJznKuEcREwNsQXYoIyo.jpg"},{"name":"Air Hotel Wartburg","0":true,"longitude":"6.745472","latitude":"51.272513","rating":null,"place_id":"ChIJv-cynDG2uEcRuXKzpFeCYAI","price":230,"img":"ChIJv-cynDG2uEcRuXKzpFeCYAI.jpg"},{"name":"Radisson Blu Scandinavia Hotel Dusseldorf","0":true,"longitude":"6.769136","latitude":"51.247122","rating":3.8,"place_id":"ChIJE-lE8-_JuEcRfG6n49wihpo","price":240,"img":"ChIJE-lE8-_JuEcRfG6n49wihpo.jpg"},{"name":"NH Duesseldorf City Nord","0":true,"longitude":"6.797047","latitude":"51.248376","rating":3.9,"place_id":"ChIJD2XoUZDJuEcRBOK-8xLoJdo","price":250,"img":"ChIJD2XoUZDJuEcRBOK-8xLoJdo.jpg"},{"name":"Maritim Hotel Duesseldorf","0":true,"longitude":"6.767906","latitude":"51.276109","rating":4.2,"place_id":"ChIJmS0BLNXJuEcRmL_7mnZNprI","price":260,"img":"ChIJmS0BLNXJuEcRmL_7mnZNprI.jpg"},{"name":"Hotel Berial","0":true,"longitude":"6.783551","latitude":"51.231655","rating":4,"place_id":"ChIJDU9-ISHKuEcR32GhRsVJs4A","price":270,"img":"ChIJDU9-ISHKuEcR32GhRsVJs4A.jpg"},{"name":"Motel One D\u00fcsseldorf-City","0":true,"longitude":"6.800522","latitude":"51.214203","rating":3.6,"place_id":"ChIJzcoQMzXKuEcRJBRGvnMfEq8","price":280,"img":"ChIJzcoQMzXKuEcRJBRGvnMfEq8.jpg"},{"name":"Melia D\u00fcsseldorf","0":true,"longitude":"6.778064","latitude":"51.233288","rating":4.7,"place_id":"ChIJE1P_hR_KuEcRx3CT6ygBTcM","price":290,"img":"ChIJE1P_hR_KuEcRx3CT6ygBTcM.jpg"}
        ];

    })
  .service('geocoding', ['$http', function ($http) {
        return {
            getCityForLocation: function (coords) {
            	if (typeof(coords) == 'undefined' || typeof(coords.latitude) == 'undefined' || typeof(coords.longitude) == 'undefined') {
            		return;
            	}

                var promise = $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + coords.latitude + ',' + coords.longitude + '&sensor=true&key=AIzaSyDOFhsxMGFu6A4VsMVjZBdcwWyxkbXGAS8')
                    .then(function (response) {
                        if (response.status == 200 && response.data.status == 'OK') {
                            var location = response.data.results.filter(function (elem) {
                                return elem.types.indexOf('locality') != -1 || elem.types.indexOf('administrative_area_level_2') != -1;
                            });

                            if (location.length > 0) {
                            	return location[0].formatted_address;
                            }
                            else {
                            	return;
                            }
                        }
                        else {
                            return;
                        }
                    });

                return promise;
            }
        };
    }])

  .factory('socket', function ($rootScope) {
        var socket = io.connect('192.168.55.44:3000');

        return {
            emit: function (event, data, callback) {
                socket.emit(event, JSON.stringify(data), function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        if (callback) {
                            callback.apply(null, args);
                        }
                    });
                });
            },
            on: function (event, callback) {
                socket.on(event, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(null, args);
                    });
                });
            },
            off: function (event, callback) {
                socket.removeListener(event, callback);
            }
        };
  })
  .directive('tabs', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {},
      controller: function($scope, $element) {
        var panes = $scope.panes = [];

        $scope.select = function(pane) {
          angular.forEach(panes, function(pane) {
            pane.selected = false;
          });
          pane.selected = true;
        }

        this.addPane = function(pane) {
          if (panes.length == 0) $scope.select(pane);
          panes.push(pane);
        }
      },
      template:
        '<div class="tabbable">' +
          '<div class="btn-group btn-group-justified">' +
            '<div class="btn-group" ng-repeat="pane in panes" ng-class="{active:pane.selected}">' +
              '<button type="button" class="btn btn-default" ng-click="select(pane)">{{pane.title}}</button>' +
            '</div>' +
          '</div>' +
          '<div class="tab-content" ng-transclude></div>' +
        '</div>',
      replace: true
    };
  })
  .directive('pane', function() {
    return {
      require: '^tabs',
      restrict: 'E',
      transclude: true,
      scope: { title: '@' },
      link: function(scope, element, attrs, tabsCtrl) {
        tabsCtrl.addPane(scope);
      },
      template:
        '<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' +
        '</div>',
      replace: true
    };
  })
  .factory('distanceCalculator', function () {
      function deg2rad(deg) {
          return deg * (Math.PI/180)
      }

      return {
          getDistanceBetweenCoordinates: function(coords1, coords2) {
              var R = 6371; // Radius of the earth in km
              var dLat = deg2rad(coords2.latitude-coords1.latitude);
              var dLon = deg2rad(coords2.longitude-coords1.longitude);
              var a =
                      Math.sin(dLat/2) * Math.sin(dLat/2) +
                      Math.cos(deg2rad(coords1.latitude)) * Math.cos(deg2rad(coords2.latitude)) *
                      Math.sin(dLon/2) * Math.sin(dLon/2)
                  ;
              var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
              var d = R * c; // Distance in km

              return d;
          }
      }
  });
