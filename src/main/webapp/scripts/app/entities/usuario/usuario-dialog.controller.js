'use strict';

angular.module('fejhipsterApp').controller('UsuarioDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'Usuario', 'InforUsuario', 'Cliente',
        function($scope, $stateParams, $uibModalInstance, $q, entity, Usuario, InforUsuario, Cliente) {

        $scope.usuario = entity;
        $scope.inforusuarioss = InforUsuario.query({filter: 'usuarios-is-null'});
        $q.all([$scope.usuario.$promise, $scope.inforusuarioss.$promise]).then(function() {
            if (!$scope.usuario.inforUsuarios || !$scope.usuario.inforUsuarios.id) {
                return $q.reject();
            }
            return InforUsuario.get({id : $scope.usuario.inforUsuarios.id}).$promise;
        }).then(function(inforUsuarios) {
            $scope.inforusuarioss.push(inforUsuarios);
        });
        $scope.clientes = Cliente.query();
        $scope.load = function(id) {
            Usuario.get({id : id}, function(result) {
                $scope.usuario = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('fejhipsterApp:usuarioUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.usuario.id != null) {
                Usuario.update($scope.usuario, onSaveSuccess, onSaveError);
            } else {
                Usuario.save($scope.usuario, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
}]);
