/**
 * Created by Administrator on 21.06.2016.
 */
(function() {
    angular
        .module('myApp')
        .factory('departmentServices', departmentServices);

    departmentServices.$inject=['$http'];

    function departmentServices($http) {
        return {
            getDepartment: function () {
                return $http.get('/api/dep');
            }
        };
    }
})();