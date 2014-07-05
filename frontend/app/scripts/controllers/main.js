'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('MainCtrl', ['$scope', '$rootScope', 'geocoding', '$location', 'socket', function ($scope, $rootScope, geocoding, $location, socket) {
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
        $scope.doubleRoom = false;

        $scope.stars = {};
        $scope.stars.one = false;
        $scope.stars.two = false;
        $scope.stars.three = false;
        $scope.stars.four = false;
        $scope.stars.five = false;

        $scope.submit = function () {
            socket.emit('position', {
                lat: $rootScope.position.coords.latitude,
                long: $rootScope.position.coords.longitude
            });

            var numberMap = {one: 1, two: 2, three: 3, four: 4, five: 5};

            var stars = [];
            Object.keys($scope.stars).forEach(function (key) {
                if ($scope.stars[key]) {
                    stars.push(numberMap[key]);
                }
            });

            socket.emit('request', {
                status: 1,
                rating: stars,
                persons: $scope.doubleRoom ? 2 : 1
            });

            $location.path( "/offer" );
        }
    }]);
