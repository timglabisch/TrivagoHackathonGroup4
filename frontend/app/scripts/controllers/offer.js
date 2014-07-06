"use strict";

/**
 * @ngdoc function
 * @name frontendApp.controller:OfferCtrl
 * @description
 * # OfferCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
    .controller('OfferCtrl', function ($scope, $rootScope, socket, $location, distanceCalculator) {
        $scope.offers = [];

        $scope.map = {
            center: {
                latitude: 0,
                longitude: 0
            },
            zoom: 12
        };

        socket.on('offer', function(offer) {
            if (typeof(offer.hotelInfo) == "undefined") {
                console.err("hotelInfo is not defined");
                return;
            }

            offer.dist = parseFloat(distanceCalculator.getDistanceBetweenCoordinates($scope.map.center, offer.hotelInfo)).toFixed(2);

            if ($scope.offers.length == 0) {
                $scope.offers.push(offer);
                return;
            }

            var old = $scope.offers.filter(function (elem) {
                return elem.hotelId == offer.hotelId;
            });
            if (old.length == 0) {
                $scope.offers.push(offer);
                return;
            }
            var oldElem = old[0];

            var index = $scope.offers.indexOf(oldElem);
            $scope.offers[index] = offer;
        });

        $scope.hotels = $rootScope.hotels;

        $scope.offerhotels = [
            {"name":"Hotel Nikko D\u00fcsseldorf","0":true,"longitude":"6.7884","latitude":"51.22309","rating":3.8,"place_id":"ChIJO5sptzrKuEcRju-J-azY_HI","price":100,"img":"ChIJO5sptzrKuEcRju-J-azY_HI.jpg"},{"name":"Breidenbacher Hof, a Capella Hotel","0":true,"longitude":"6.777759","latitude":"51.225498","rating":4.4,"place_id":"ChIJL198miLKuEcR8-vP1kts4bM","price":110,"img":"ChIJL198miLKuEcR8-vP1kts4bM.jpg"}
        ];

        $scope.book = function(hotel) {

            socket.emit('accept_offer', { backend_user_uuid: hotel.backend_user_uuid })

            $location.path('/offer/' + hotel.backend_user_uuid + '/book');

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
