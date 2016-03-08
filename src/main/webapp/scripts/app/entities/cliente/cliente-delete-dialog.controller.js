'use strict';

angular.module('fejhipsterApp')
	.controller('ClienteDeleteController', function($scope, $uibModalInstance, entity, Cliente) {

        $scope.cliente = entity;
        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            Cliente.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };

    });
