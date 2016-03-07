'use strict';

angular.module('fejhipsterApp')
    .factory('Register', function ($resource) {
        return $resource('api/register', {}, {
        });
    });


