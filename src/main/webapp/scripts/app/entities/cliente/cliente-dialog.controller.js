'use strict';

angular.module('fejhipsterApp').controller('ClienteDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Cliente', 'Usuario', 'InforCliente',
        function($scope, $stateParams, $uibModalInstance, entity, Cliente, Usuario, InforCliente) {

        $scope.cliente = entity;
        $scope.usuarios = Usuario.query();
        $scope.inforclientes = InforCliente.query();
        $scope.load = function(id) {
            Cliente.get({id : id}, function(result) {
                $scope.cliente = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('fejhipsterApp:clienteUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.cliente.id != null) {
                Cliente.update($scope.cliente, onSaveSuccess, onSaveError);
            } else {
                Cliente.save($scope.cliente, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
}]);
