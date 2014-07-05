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
                    this.reject('error');
            		return;
            	}
            
                var promise = $http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + coords.latitude + ',' + coords.longitude + '&sensor=true')
                    .then(function (response) {
                        if (response.status == 200 && response.data.status == 'OK') {
                            var location = response.data.results.filter(function (elem) {
                                return elem.types.indexOf('locality') != -1 || elem.types.indexOf('administrative_area_level_2') != -1;
                            });
                            
                            if (location.length > 0) {
                            	return location[0].formatted_address;
                            }
                            else {
                                this.reject('error');
                            	return;
                            }
                        }
                        else {
                            this.reject('error');
                            return;
                        }
                    });

                return promise;
            }
        };
    }])
  .factory('ws', function ($rootScope) {
    var socket = io.connect();

    return {
      on: function (event, callback) {
        socket.on(event, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            callback.apply(null, args);
          });
        });
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
  });
