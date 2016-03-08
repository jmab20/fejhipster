'use strict';

angular.module('fejhipsterApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('pais', {
                parent: 'entity',
                url: '/paiss',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'fejhipsterApp.pais.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/pais/paiss.html',
                        controller: 'PaisController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('pais');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('pais.detail', {
                parent: 'entity',
                url: '/pais/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'fejhipsterApp.pais.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/pais/pais-detail.html',
                        controller: 'PaisDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('pais');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Pais', function($stateParams, Pais) {
                        return Pais.get({id : $stateParams.id});
                    }]
                }
            })
            .state('pais.new', {
                parent: 'pais',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/pais/pais-dialog.html',
                        controller: 'PaisDialogController',
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
                        $state.go('pais', null, { reload: true });
                    }, function() {
                        $state.go('pais');
                    })
                }]
            })
            .state('pais.edit', {
                parent: 'pais',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/pais/pais-dialog.html',
                        controller: 'PaisDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Pais', function(Pais) {
                                return Pais.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('pais', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('pais.delete', {
                parent: 'pais',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                    $uibModal.open({
                        templateUrl: 'scripts/app/entities/pais/pais-delete-dialog.html',
                        controller: 'PaisDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['Pais', function(Pais) {
                                return Pais.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('pais', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
