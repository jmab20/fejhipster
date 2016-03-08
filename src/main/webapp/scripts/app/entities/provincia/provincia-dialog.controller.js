'use strict';

angular.module('fejhipsterApp').controller('ProvinciaDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Provincia', 'Comunidad', 'InforCliente', 'InforUsuario',
        function($scope, $stateParams, $uibModalInstance, entity, Provincia, Comunidad, InforCliente, InforUsuario) {

        $scope.provincia = entity;
        $scope.comunidads = Comunidad.query();
        $scope.inforclientes = InforCliente.query();
        $scope.inforusuarios = InforUsuario.query();
        $scope.load = function(id) {
            Provincia.get({id : id}, function(result) {
                $scope.provincia = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('fejhipsterApp:provinciaUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.provincia.id != null) {
                Provincia.update($scope.provincia, onSaveSuccess, onSaveError);
            } else {
                Provincia.save($scope.provincia, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
}]);
