'use strict';

angular.module('fejhipsterApp')
    .controller('ClienteController', function ($scope, $state, Cliente, ClienteSearch) {

        $scope.clientes = [];
        $scope.loadAll = function() {
            Cliente.query(function(result) {
               $scope.clientes = result;
            });
        };
        $scope.loadAll();


        $scope.search = function () {
            ClienteSearch.query({query: $scope.searchQuery}, function(result) {
                $scope.clientes = result;
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
            $scope.cliente = {
                cif: null,
                tipoDocumento: null,
                nombreSocial: null,
                alta: null,
                entradaVigor: null,
                observ: null,
                estado: null,
                bloqueado: null,
                baja: null,
                bajaVigor: null,
                moroso: null,
                modificacion: null,
                autoriza: null,
                altaIndirecto: null,
                ampliado: null,
                bloqueo: null,
                vencimento: null,
                diasMargenCobro: null,
                docNoRecibida: null,
                categoria: null,
                id: null
            };
        };
    });
