'use strict';

angular.module('fejhipsterApp')
    .controller('PaisDetailController', function ($scope, $rootScope, $stateParams, entity, Pais, InforCliente, InforUsuario) {
        $scope.pais = entity;
        $scope.load = function (id) {
            Pais.get({id: id}, function(result) {
                $scope.pais = result;
            });
        };
        var unsubscribe = $rootScope.$on('fejhipsterApp:paisUpdate', function(event, result) {
            $scope.pais = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
