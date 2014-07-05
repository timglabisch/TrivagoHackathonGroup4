"use strict";

/**
 * @ngdoc function
 * @name frontendApp.controller:OfferCtrl
 * @description
 * # OfferCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
    .controller('OfferCtrl', function ($scope, $rootScope) {
        $scope.map = {
            center: {
                latitude: 0,
                longitude: 0
            },
            zoom: 12
        };

        $rootScope.$watch('position', function (position) {
            if (typeof(position) == 'undefined' || typeof(position.coords) == 'undefined') {
                $scope.location = '';
                return;
            }

            $scope.map.center.latitude = position.coords.latitude;
            $scope.map.center.longitude = position.coords.longitude;

            socket.emit('position', {
                lat: $rootScope.position.coords.latitude,
                long: $rootScope.position.coords.longitude
            });
        }, true);
    });
