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
  .module('frontendApp', ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ngRoute', 'google-maps'])
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
  });
