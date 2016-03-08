'use strict';

angular.module('fejhipsterApp')
    .controller('ComunidadController', function ($scope, $state, Comunidad, ComunidadSearch) {

        $scope.comunidads = [];
        $scope.loadAll = function() {
            Comunidad.query(function(result) {
               $scope.comunidads = result;
            });
        };
        $scope.loadAll();


        $scope.search = function () {
            ComunidadSearch.query({query: $scope.searchQuery}, function(result) {
                $scope.comunidads = result;
            }, function(response) {
                if(response.status === 404) {
                    $scope.loadAll();
                }
            });
        };

        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.comunidad = {
                des: null,
                id: null
            };
        };
    });
