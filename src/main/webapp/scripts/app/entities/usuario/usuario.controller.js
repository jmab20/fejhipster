'use strict';

angular.module('fejhipsterApp')
    .controller('UsuarioController', function ($scope, $state, Usuario, UsuarioSearch) {

        $scope.usuarios = [];
        $scope.loadAll = function() {
            Usuario.query(function(result) {
               $scope.usuarios = result;
            });
        };
        $scope.loadAll();


        $scope.search = function () {
            UsuarioSearch.query({query: $scope.searchQuery}, function(result) {
                $scope.usuarios = result;
            }, function(response) {
                if(response.status === 404) {
                    $scope.loadAll();
                }
            });
        };

        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.usuario = {
                nombre: null,
                apellidos: null,
                email: null,
                telefono: null,
                movil: null,
                fax: null,
                password: null,
                observ: null,
                estado: null,
                alta: null,
                deptCargo: null,
                primerAcceso: null,
                baja: null,
                passTemporal: null,
                envioLopd: null,
                docNoRecibida: null,
                usuarioResponsable: null,
                id: null
            };
        };
    });
