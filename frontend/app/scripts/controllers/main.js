'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('MainCtrl', ['$scope', '$rootScope', '$geolocation', 'geocoding', '$location', function ($scope, $rootScope, $geolocation, geocoding, $location) {
        $geolocation.watchPosition({
            timeout: 60000,
            maximumAge: 250,
            enableHighAccuracy: true
        });
        $rootScope.position = $geolocation.position;

        $rootScope.$watch('position', function (position) {
            if (typeof(position) == 'undefined' || typeof(position.coords) == 'undefined') {
                $scope.location = '';
                return;
            }

            geocoding.getCityForLocation(position.coords).then(function (location) {
                $scope.location = location;
            }, function () {
                $scope.location = '';
            });
        }, true);

        $scope.location = '';

        $scope.stars = {};
        $scope.stars.one = false;
        $scope.stars.two = false;
        $scope.stars.three = false;
        $scope.stars.four = false;
        $scope.stars.five = false;

        $scope.submit = function () {
            $location.path( "/offer" );
        }
    }]);
