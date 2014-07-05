'use strict';

/**
 * @ngdoc function
 * @name hotelierApp.controller:AppCtrl
 * @description
 * # AboutCtrl
 * Controller of the hotelierApp
 */
angular.module('hotelierApp')
  .controller('AppCtrl', function ($scope, socket, $routeParams, $rootScope) {
        $scope.requests = [];

        socket.on('position', function (data) {
            if (data.status == 0) {
                return;
            }

            data.latitude = data.lat;
            data.longitude = data.long;
            delete data.lat;
            delete data.long;

            $scope.requests.push(data);
        });

        $scope.map = {
            center: {
                latitude: 45,
                longitude: -73
            },
            zoom: 15
        };

        $scope.data = {};
        $scope.data.activeRequest = {};

        $scope.hotel = $rootScope.hotels.filter(function(elem) {
            return elem.place_id == $routeParams.placeid;
        })[0];

        $scope.$watch('requests', function(newValue, oldValue) {
            if (newValue == oldValue) {
                return;
            }

            newValue.forEach(function(value) {
                if (!value.active) {
                    return;
                }

                $scope.map.center.latitude = value.latitude;
                $scope.map.center.longitude = value.longitude;
            });
        }, true);

        $scope.select = function (request) {
            $scope.requests.forEach(function (elem) {
                elem.active = false;
            });
            request.active = true;
            $scope.data.activeRequest = request;
        }
  });
