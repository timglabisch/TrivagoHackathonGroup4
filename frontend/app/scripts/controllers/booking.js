'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:BookingCtrl
 * @description
 * # BookingCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
    .controller('BookingCtrl', function ($scope, $routeParams, socket) {
        socket.emit('accept_offer', {"backend_user_uuid": $routeParams.id});
    });