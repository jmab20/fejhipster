'use strict';

angular.module('fejhipsterApp')
    .controller('PaisController', function ($scope, $state, Pais, PaisSearch) {

        $scope.paiss = [];
        $scope.loadAll = function() {
            Pais.query(function(result) {
               $scope.paiss = result;
            });
        };
        $scope.loadAll();


        $scope.search = function () {
            PaisSearch.query({query: $scope.searchQuery}, function(result) {
                $scope.paiss = result;
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
            $scope.pais = {
                des: null,
                id: null
            };
        };
    });
