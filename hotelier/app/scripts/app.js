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
      .when('/app', {
        templateUrl: 'views/app.html',
        controller: 'AppCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
