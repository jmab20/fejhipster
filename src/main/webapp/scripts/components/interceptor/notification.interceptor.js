 'use strict';

angular.module('fejhipsterApp')
    .factory('notificationInterceptor', function ($q, AlertService) {
        return {
            response: function(response) {
                var alertKey = response.headers('X-fejhipsterApp-alert');
                if (angular.isString(alertKey)) {
                    AlertService.success(alertKey, { param : response.headers('X-fejhipsterApp-params')});
                }
                return response;
            }
        };
    });
