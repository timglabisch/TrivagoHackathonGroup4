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
