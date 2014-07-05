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
  .module('frontendApp', ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ngRoute'])
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
  });
