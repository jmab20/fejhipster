'use strict';

angular.module('fejhipsterApp')
    .controller('ComunidadDetailController', function ($scope, $rootScope, $stateParams, entity, Comunidad, Provincia) {
        $scope.comunidad = entity;
        $scope.load = function (id) {
            Comunidad.get({id: id}, function(result) {
                $scope.comunidad = result;
            });
        };
        var unsubscribe = $rootScope.$on('fejhipsterApp:comunidadUpdate', function(event, result) {
            $scope.comunidad = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
