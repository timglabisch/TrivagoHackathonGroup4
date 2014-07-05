'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('MainCtrl', ['$scope', '$geolocation', function ($scope, $geolocation) {
        $geolocation.watchPosition({
            timeout: 60000,
            maximumAge: 250,
            enableHighAccuracy: true
        });
        $scope.myCoords = $geolocation.position.coords; // this is regularly updated
        $scope.myError = $geolocation.position.error;
        console.log($geolocation.position);

    }]);
