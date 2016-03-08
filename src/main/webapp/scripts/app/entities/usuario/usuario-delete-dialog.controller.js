'use strict';

angular.module('fejhipsterApp')
	.controller('UsuarioDeleteController', function($scope, $uibModalInstance, entity, Usuario) {

        $scope.usuario = entity;
        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            Usuario.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };

    });
