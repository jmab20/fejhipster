'use strict';

angular.module('fejhipsterApp')
	.controller('ComunidadDeleteController', function($scope, $uibModalInstance, entity, Comunidad) {

        $scope.comunidad = entity;
        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            Comunidad.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };

    });
