'use strict';

angular.module('fejhipsterApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('cliente', {
                parent: 'entity',
                url: '/clientes',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'fejhipsterApp.cliente.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/cliente/clientes.html',
                        controller: 'ClienteController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('cliente');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('cliente.detail', {
                parent: 'entity',
                url: '/cliente/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'fejhipsterApp.cliente.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/cliente/cliente-detail.html',
                        controller: 'ClienteDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('cliente');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Cliente', function($stateParams, Cliente) {
                        return Cliente.get({id : $stateParams.id});
                    }]
                }
            })
            .state('cliente.new', {
                parent: 'cliente',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/cliente/cliente-dialog.html',
                        controller: 'ClienteDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
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
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('cliente', null, { reload: true });
                    }, function() {
                        $state.go('cliente');
                    })
                }]
            })
            .state('cliente.edit', {
                parent: 'cliente',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/cliente/cliente-dialog.html',
                        controller: 'ClienteDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Cliente', function(Cliente) {
                                return Cliente.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('cliente', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('cliente.delete', {
                parent: 'cliente',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/cliente/cliente-delete-dialog.html',
                        controller: 'ClienteDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['Cliente', function(Cliente) {
                                return Cliente.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('cliente', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
