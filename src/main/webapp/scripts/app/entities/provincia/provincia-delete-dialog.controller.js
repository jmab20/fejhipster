'use strict';

angular.module('fejhipsterApp')
	.controller('ProvinciaDeleteController', function($scope, $uibModalInstance, entity, Provincia) {

        $scope.provincia = entity;
        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            Provincia.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        };

    });
