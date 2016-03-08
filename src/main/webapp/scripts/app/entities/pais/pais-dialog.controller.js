'use strict';

angular.module('fejhipsterApp').controller('PaisDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Pais', 'InforCliente', 'InforUsuario',
        function($scope, $stateParams, $uibModalInstance, entity, Pais, InforCliente, InforUsuario) {

        $scope.pais = entity;
        $scope.inforclientes = InforCliente.query();
        $scope.inforusuarios = InforUsuario.query();
        $scope.load = function(id) {
            Pais.get({id : id}, function(result) {
                $scope.pais = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('fejhipsterApp:paisUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.pais.id != null) {
                Pais.update($scope.pais, onSaveSuccess, onSaveError);
            } else {
                Pais.save($scope.pais, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
}]);
