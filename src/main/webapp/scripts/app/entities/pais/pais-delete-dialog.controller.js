'use strict';

angular.module('fejhipsterApp')
	.controller('PaisDeleteController', function($scope, $uibModalInstance, entity, Pais) {

        $scope.pais = entity;
        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            Pais.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };

    });
