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
            edit: function (id) {
                return $http.get('/api/docs/edit?id=' + id);
            },

            search: function (data) {
                return $http.get('/api/search' + data);
            },
            getDepartment: function () {
                return $http.get('/api/dep');
            },
            newDocument: function () {
                $window.location.href = '/documents/singleFileUpload';
            },
            goToDashboard: function () {
                $window.location.href='/profile/dashboard';
            }


        };
    }
})();