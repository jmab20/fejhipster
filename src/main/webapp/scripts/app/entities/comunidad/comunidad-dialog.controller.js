'use strict';

angular.module('fejhipsterApp').controller('ComunidadDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Comunidad', 'Provincia',
        function($scope, $stateParams, $uibModalInstance, entity, Comunidad, Provincia) {

        $scope.comunidad = entity;
        $scope.provincias = Provincia.query();
        $scope.load = function(id) {
            Comunidad.get({id : id}, function(result) {
                $scope.comunidad = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('fejhipsterApp:comunidadUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.comunidad.id != null) {
                Comunidad.update($scope.comunidad, onSaveSuccess, onSaveError);
            } else {
                Comunidad.save($scope.comunidad, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
}]);
