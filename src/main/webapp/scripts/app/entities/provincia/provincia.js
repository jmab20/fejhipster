'use strict';

angular.module('fejhipsterApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('provincia', {
                parent: 'entity',
                url: '/provincias',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'fejhipsterApp.provincia.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/provincia/provincias.html',
                        controller: 'ProvinciaController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('provincia');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('provincia.detail', {
                parent: 'entity',
                url: '/provincia/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'fejhipsterApp.provincia.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/provincia/provincia-detail.html',
                        controller: 'ProvinciaDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('provincia');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Provincia', function($stateParams, Provincia) {
                        return Provincia.get({id : $stateParams.id});
                    }]
                }
            })
            .state('provincia.new', {
                parent: 'provincia',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/provincia/provincia-dialog.html',
                        controller: 'ProvinciaDialogController',
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
                        $state.go('provincia', null, { reload: true });
                    }, function() {
                        $state.go('provincia');
                    })
                }]
            })
            .state('provincia.edit', {
                parent: 'provincia',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/provincia/provincia-dialog.html',
                        controller: 'ProvinciaDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Provincia', function(Provincia) {
                                return Provincia.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('provincia', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('provincia.delete', {
                parent: 'provincia',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/provincia/provincia-delete-dialog.html',
                        controller: 'ProvinciaDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['Provincia', function(Provincia) {
                                return Provincia.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('provincia', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
