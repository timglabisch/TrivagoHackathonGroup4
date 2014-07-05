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

            if ($scope.requests.length == 0) {
                data.active = true;
                $scope.requests.push(data);
                return;
            }

            var old = $scope.requests.filter(function (elem) {
                return elem.uuid == data.uuid;
            });
            if (old.length == 0) {
                $scope.requests.push(data);
                return;
            }
            var oldElem = old[0];

            var index = $scope.requests.indexOf(oldElem);
            data.active = oldElem.active;
            $scope.requests[index] = data;
        });

        socket.on('user_disconnect', function (user) {
            var old = $scope.requests.filter(function (elem) {
                elem.uuid = user.uuid;
            });
            if (old.length == 0) {
                return;
            }
            var index = $scope.requests.indexOf(old);
            $scope.requests.splice(index, 1);
        });

        $scope.map = {
            center: {
                latitude: 45,
                longitude: -73
            },
            zoom: 15
        };

        $scope.doubleRoom = false;

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
                $scope.doubleRoom = (value.persons > 1);
            });
        }, true);

        $scope.select = function (request) {
            $scope.requests.forEach(function (elem) {
                elem.active = false;
            });
            request.active = true;
        };

        $scope.offer = {};
        $scope.offer.price = $scope.hotel.price;

        $scope.sendOffer = function () {
            var currentRequest = $scope.requests.filter(function (elem) {
                return elem.active;
            })[0];

            socket.emit('sendOffer', {
                user_uuid: currentRequest.uuid,
                price: $scope.offer.price,
                hotelId: $scope.hotel.place_id,
                hotelInfo: {
                    name: $scope.hotel.name,
                    address: $scope.hotel.address,
                    longitude: $scope.hotel.longitude,
                    latitude: $scope.hotel.latitude,
                    img: $scope.hotel.img
                }
            });
        }
  });
