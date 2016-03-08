'use strict';

angular.module('fejhipsterApp')
    .controller('ClienteDetailController', function ($scope, $rootScope, $stateParams, entity, Cliente, Usuario, InforCliente) {
        $scope.cliente = entity;
        $scope.load = function (id) {
            Cliente.get({id: id}, function(result) {
                $scope.cliente = result;
            });
        };
        var unsubscribe = $rootScope.$on('fejhipsterApp:clienteUpdate', function(event, result) {
            $scope.cliente = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
