'use strict';

angular.module('fejhipsterApp')
    .controller('ProvinciaController', function ($scope, $state, Provincia, ProvinciaSearch) {

        $scope.provincias = [];
        $scope.loadAll = function() {
            Provincia.query(function(result) {
               $scope.provincias = result;
            });
        };
        $scope.loadAll();


        $scope.search = function () {
            ProvinciaSearch.query({query: $scope.searchQuery}, function(result) {
                $scope.provincias = result;
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
            $scope.provincia = {
                des: null,
                id: null
            };
        };
    });
