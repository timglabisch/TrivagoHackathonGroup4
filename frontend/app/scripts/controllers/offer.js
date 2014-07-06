"use strict";

/**
 * @ngdoc function
 * @name frontendApp.controller:OfferCtrl
 * @description
 * # OfferCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
    .controller('OfferCtrl', function ($scope, $rootScope, socket) {
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

            $scope.offers.push(offer)
        });

        $scope.hotels = [
            {"name":"Hotel Nikko D\u00fcsseldorf","0":true,"longitude":"6.7884","latitude":"51.22309","rating":3.8,"place_id":"ChIJO5sptzrKuEcRju-J-azY_HI","price":100,"img":"ChIJO5sptzrKuEcRju-J-azY_HI.jpg"},{"name":"Breidenbacher Hof, a Capella Hotel","0":true,"longitude":"6.777759","latitude":"51.225498","rating":4.4,"place_id":"ChIJL198miLKuEcR8-vP1kts4bM","price":110,"img":"ChIJL198miLKuEcR8-vP1kts4bM.jpg"},{"name":"Steigenberger Parkhotel","0":true,"longitude":"6.777922","latitude":"51.226734","rating":4.1,"place_id":"ChIJU4F0iyLKuEcRQtob67qx2BQ","price":120,"img":"ChIJU4F0iyLKuEcRQtob67qx2BQ.jpg"},{"name":"Hotel Am Rathaus","0":true,"longitude":"6.772385","latitude":"51.226126","rating":null,"place_id":"ChIJVwxo6xnKuEcRJXZN1Ekdrzg","price":130,"img":"ChIJVwxo6xnKuEcRJXZN1Ekdrzg.jpg"},{"name":"Altstadthotel St. Georg","0":true,"longitude":"6.775395","latitude":"51.226392","rating":null,"place_id":"ChIJS0-9ZxjKuEcRQNnT7ZQrhKA","price":140,"img":"ChIJS0-9ZxjKuEcRQNnT7ZQrhKA.jpg"},{"name":"Courtyard Duesseldorf Seestern","0":true,"longitude":"6.738782","latitude":"51.242233","rating":3.8,"place_id":"ChIJ_cv_0gi2uEcR86JJr0rWfH0","price":150,"img":"ChIJ_cv_0gi2uEcR86JJr0rWfH0.jpg"},{"name":"Gut Dyckhof Hotel \u0026 Restaurant","0":true,"longitude":"6.682793","latitude":"51.241746","rating":4.6,"place_id":"ChIJ8c3RuZ22uEcRbsiKZMtvqNo","price":160,"img":null},{"name":"Sheraton D\u00fcsseldorf Airport Hotel","0":true,"longitude":"6.768104","latitude":"51.278263","rating":3.7,"place_id":"ChIJzwY4JivIuEcR5z28eb_wMJ8","price":170,"img":"ChIJzwY4JivIuEcR5z28eb_wMJ8.jpg"},{"name":"Carathotel D\u00fcsseldorf Altstadt","0":true,"longitude":"6.773146","latitude":"51.222956","rating":4.4,"place_id":"ChIJ99cuCRfKuEcRlbte_jIRBOI","price":180,"img":"ChIJ99cuCRfKuEcRlbte_jIRBOI.jpg"},{"name":"Hotel Ibis Duesseldorf Hauptbahnhof","0":true,"longitude":"6.793206","latitude":"51.220565","rating":3.8,"place_id":"ChIJLxHU_TDKuEcRSBm0tnPxyyQ","price":190,"img":null},{"name":"Best Western Savoy Hotel D\u00fcsseldorf","0":true,"longitude":"6.785318","latitude":"51.220884","rating":3.8,"place_id":"ChIJseIjrDvKuEcR_rNKYJ-nGzo","price":200,"img":"ChIJseIjrDvKuEcR_rNKYJ-nGzo.jpg"},{"name":"FFFZ Hotel Und Tagungshaus","0":true,"longitude":"6.75237","latitude":"51.26378","rating":null,"place_id":"ChIJ536hGSS2uEcRH6pnRnjC3v8","price":210,"img":null},{"name":"A\u0026O Duesseldorf Hauptbahnhof Hotel","0":true,"longitude":"6.782393","latitude":"51.216373","rating":4,"place_id":"ChIJ-bOAJznKuEcREwNsQXYoIyo","price":220,"img":"ChIJ-bOAJznKuEcREwNsQXYoIyo.jpg"},{"name":"Air Hotel Wartburg","0":true,"longitude":"6.745472","latitude":"51.272513","rating":null,"place_id":"ChIJv-cynDG2uEcRuXKzpFeCYAI","price":230,"img":"ChIJv-cynDG2uEcRuXKzpFeCYAI.jpg"},{"name":"Radisson Blu Scandinavia Hotel Dusseldorf","0":true,"longitude":"6.769136","latitude":"51.247122","rating":3.8,"place_id":"ChIJE-lE8-_JuEcRfG6n49wihpo","price":240,"img":"ChIJE-lE8-_JuEcRfG6n49wihpo.jpg"},{"name":"NH Duesseldorf City Nord","0":true,"longitude":"6.797047","latitude":"51.248376","rating":3.9,"place_id":"ChIJD2XoUZDJuEcRBOK-8xLoJdo","price":250,"img":"ChIJD2XoUZDJuEcRBOK-8xLoJdo.jpg"},{"name":"Maritim Hotel Duesseldorf","0":true,"longitude":"6.767906","latitude":"51.276109","rating":4.2,"place_id":"ChIJmS0BLNXJuEcRmL_7mnZNprI","price":260,"img":"ChIJmS0BLNXJuEcRmL_7mnZNprI.jpg"},{"name":"Hotel Berial","0":true,"longitude":"6.783551","latitude":"51.231655","rating":4,"place_id":"ChIJDU9-ISHKuEcR32GhRsVJs4A","price":270,"img":"ChIJDU9-ISHKuEcR32GhRsVJs4A.jpg"},{"name":"Motel One D\u00fcsseldorf-City","0":true,"longitude":"6.800522","latitude":"51.214203","rating":3.6,"place_id":"ChIJzcoQMzXKuEcRJBRGvnMfEq8","price":280,"img":"ChIJzcoQMzXKuEcRJBRGvnMfEq8.jpg"},{"name":"Melia D\u00fcsseldorf","0":true,"longitude":"6.778064","latitude":"51.233288","rating":4.7,"place_id":"ChIJE1P_hR_KuEcRx3CT6ygBTcM","price":290,"img":"ChIJE1P_hR_KuEcRx3CT6ygBTcM.jpg"}
        ];

        $scope.offerhotels = [
            {"name":"Hotel Nikko D\u00fcsseldorf","0":true,"longitude":"6.7884","latitude":"51.22309","rating":3.8,"place_id":"ChIJO5sptzrKuEcRju-J-azY_HI","price":100,"img":"ChIJO5sptzrKuEcRju-J-azY_HI.jpg"},{"name":"Breidenbacher Hof, a Capella Hotel","0":true,"longitude":"6.777759","latitude":"51.225498","rating":4.4,"place_id":"ChIJL198miLKuEcR8-vP1kts4bM","price":110,"img":"ChIJL198miLKuEcR8-vP1kts4bM.jpg"}
        ];

        $scope.book = function(hotelId) {

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
