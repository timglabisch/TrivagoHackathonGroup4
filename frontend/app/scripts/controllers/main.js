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

        $scope.rating = 1;
        $scope.rating = {};
        $scope.rating.one = true;
        $scope.rating.two = true;
        $scope.rating.three = true;
        $scope.rating.four = true;
        $scope.rating.five = true;

        $scope.submit = function () {
            socket.emit('position', {
                lat: $rootScope.position.coords.latitude,
                long: $rootScope.position.coords.longitude
            }, function() {
                console.log(arguments);
            });

            var numberMap = {one: 1, two: 2, three: 3, four: 4, five: 5};

            var ratings = [];
            Object.keys($scope.rating).forEach(function (key) {
                if ($scope.rating[key]) {
                    ratings.push(numberMap[key]);
                }
            });

            socket.emit('request', {
                status: 1,
                rating: $scope.rating,
                persons: $scope.doubleRoom ? 2 : 1
            });

            $location.path('/offer');
        };
    }]);
