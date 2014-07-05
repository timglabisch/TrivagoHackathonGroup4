'use strict';

/**
 * @ngdoc function
 * @name hotelierApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hotelierApp
 */
angular.module('hotelierApp')
  .controller('MainCtrl', function ($scope, $http) {
        $scope.submit = function () {

        };

        $scope.hotel = {};

        $http.get('/hotel.json')
            .success(function(data, status, headers, config) {
                console.log(data);
            })
  });
