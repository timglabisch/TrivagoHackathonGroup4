/**
 * @ngdoc function
 * @name frontendApp.controller:OfferCtrl
 * @description
 * # OfferCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
    .controller('OfferCtrl', function ($scope) {
        $scope.map = {
            center: {
                latitude: 45,
                longitude: -73
            },
            zoom: 8
        };
    });