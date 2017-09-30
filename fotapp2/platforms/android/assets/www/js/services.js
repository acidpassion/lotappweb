angular.module('starter.services', [])

    .factory('filterFactory', filterFactory);

    /* @ngInject */
    function filterFactory($http, API_ENDPOINT, $q) {
        var service = {
            getFilters: getFilters
        };

        return service;

        function getFilters() {
            var defer = $q.defer();

            $http.get(API_ENDPOINT.host + ':' + API_ENDPOINT.port + '/api/filters/59c6828ebb20d4045439ac55').success(function (data) {
                defer.resolve(data);
            }).error(function (data, status) {
                defer.reject(data);
            });

            return defer.promise;
        }
    }
