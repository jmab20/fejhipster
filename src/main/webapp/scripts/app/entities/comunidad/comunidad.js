'use strict';

angular.module('fejhipsterApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('comunidad', {
                parent: 'entity',
                url: '/comunidads',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'fejhipsterApp.comunidad.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/comunidad/comunidads.html',
                        controller: 'ComunidadController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('comunidad');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('comunidad.detail', {
                parent: 'entity',
                url: '/comunidad/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'fejhipsterApp.comunidad.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/comunidad/comunidad-detail.html',
                        controller: 'ComunidadDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('comunidad');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Comunidad', function($stateParams, Comunidad) {
                        return Comunidad.get({id : $stateParams.id});
                    }]
                }
            })
            .state('comunidad.new', {
                parent: 'comunidad',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/comunidad/comunidad-dialog.html',
                        controller: 'ComunidadDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    des: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('comunidad', null, { reload: true });
                    }, function() {
                        $state.go('comunidad');
                    })
                }]
            })
            .state('comunidad.edit', {
                parent: 'comunidad',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/comunidad/comunidad-dialog.html',
                        controller: 'ComunidadDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Comunidad', function(Comunidad) {
                                return Comunidad.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('comunidad', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('comunidad.delete', {
                parent: 'comunidad',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/comunidad/comunidad-delete-dialog.html',
                        controller: 'ComunidadDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['Comunidad', function(Comunidad) {
                                return Comunidad.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('comunidad', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
