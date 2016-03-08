'use strict';

angular.module('fejhipsterApp')
    .controller('UsuarioDetailController', function ($scope, $rootScope, $stateParams, entity, Usuario, InforUsuario, Cliente) {
        $scope.usuario = entity;
        $scope.load = function (id) {
            Usuario.get({id: id}, function(result) {
                $scope.usuario = result;
            });
        };
        var unsubscribe = $rootScope.$on('fejhipsterApp:usuarioUpdate', function(event, result) {
            $scope.usuario = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
