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
    });
