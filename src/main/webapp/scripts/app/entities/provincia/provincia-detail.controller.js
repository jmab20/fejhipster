'use strict';

angular.module('fejhipsterApp')
    .controller('ProvinciaDetailController', function ($scope, $rootScope, $stateParams, entity, Provincia, Comunidad, InforCliente, InforUsuario) {
        $scope.provincia = entity;
        $scope.load = function (id) {
            Provincia.get({id: id}, function(result) {
                $scope.provincia = result;
            });
        };
        var unsubscribe = $rootScope.$on('fejhipsterApp:provinciaUpdate', function(event, result) {
            $scope.provincia = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
