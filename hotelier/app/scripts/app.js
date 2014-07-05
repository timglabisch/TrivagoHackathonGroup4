'use strict';

/**
 * @ngdoc overview
 * @name hotelierApp
 * @description
 * # hotelierApp
 *
 * Main module of the application.
 */
angular
  .module('hotelierApp', ['ngAnimate', 'ngRoute', 'ngSanitize', 'ui.bootstrap', 'google-maps'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/:placeid', {
        templateUrl: 'views/app.html',
        controller: 'AppCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
    .run(function ($rootScope, $http) {
        $rootScope.hotels = [];

        $http.get('/hotel.json')
            .success(function(data, status, headers, config) {
                $rootScope.hotels = data.data;
            });
    })
    .factory('socket', function ($rootScope) {
        var socket = io.connect('192.168.55.44:3001');

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
