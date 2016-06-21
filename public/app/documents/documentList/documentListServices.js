(function() {
    angular
        .module('myApp')
        .factory('documentListServices', documentListServices);

    documentListServices.$inject = [
        '$http',
        '$window'
    ];
    function documentListServices ($http, $window) {
        return {

            delete: function (id) {
                return $http.post('/api/docs/delete', id);
            },
            search: function (data) {
                return $http.get('/api/search' + data);
            },
            goToDashboard: function () {
                $window.location.href='/profile/dashboard';
            }


        };
    }
})();