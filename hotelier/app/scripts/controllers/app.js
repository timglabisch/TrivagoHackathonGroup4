'use strict';

/**
 * @ngdoc function
 * @name hotelierApp.controller:AppCtrl
 * @description
 * # AboutCtrl
 * Controller of the hotelierApp
 */
angular.module('hotelierApp')
  .controller('AppCtrl', function ($scope, socket, $routeParams, $rootScope, distanceCalculator) {
        $scope.requests = [];
        
        socket.on('position', function (data) {
            if (data.status == 0) {
                return;
            }

            data.latitude = data.lat;
            data.longitude = data.long;
            delete data.lat;
            delete data.long;

            data.distance = distanceCalculator.getDistanceBetweenCoordinates(data, $scope.hotel);
            data['dist']=parseFloat(distanceCalculator.getDistanceBetweenCoordinates(data,$scope.hotel)).toFixed(2);
            data['doubleRoom'] = (data.persons > 1);
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
        socket.on('offer_accepted', function (message){
            
            $scope.user_uuid = message.user_uuid;
        });
        socket.on('user_disconnect', function (user) {
            var old = $scope.requests.filter(function (elem) {
                return elem.uuid == user;
            });
            if (old.length == 0) {
                return;
            }
            var oldElem = old[0];
            var index = $scope.requests.indexOf(oldElem);
            $scope.requests.splice(index, 1);
            if (oldElem.active) {
                $scope.requests[0].active = true;
            }
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
                console.log(value);
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
                taxi: $scope.offer.taxi,
                breakfast: $scope.offer.breakfast,
                hotelInfo: {
                    name: $scope.hotel.name,
                    address: $scope.hotel.address,
                    longitude: $scope.hotel.longitude,
                    latitude: $scope.hotel.latitude,
                    img: $scope.hotel.img,
                    rating: $scope.hotel.rating
                }
            });
        }
  });
