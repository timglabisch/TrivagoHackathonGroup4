'use strict';

/**
 * @ngdoc function
 * @name hotelierApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hotelierApp
 */
angular.module('hotelierApp')
  .controller('MainCtrl', function ($scope, $http, $location, $rootScope) {
        $scope.submit = function () {
            $rootScope.hotel = $scope.data.selected;

            $location.path("/app");
        };

        $scope.data = {};
        $scope.hotels = [];

        $http.get('/hotel.json')
            .success(function(data, status, headers, config) {
                $scope.hotels = data.data;
                console.log(data.data);
            });

  });
