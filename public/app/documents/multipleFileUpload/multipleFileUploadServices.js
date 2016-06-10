(function() {
    angular
        .module('myApp')
        .factory('uploadMultipleServices', uploadMultipleServices);

    uploadMultipleServices.$inject=[
        '$http',
        '$window'
    ];

    function uploadMultipleServices($http,$window) {
        return {
            create: function (docData) {
                return $http.post('/uploadMulti', docData);
            },
            getDepartment: function () {
                return $http.get('/api/dep');
            },
            singleFileUpload: function () {
                $window.location.href = '/documents/singleFileUpload';
            },
            goToDashboard: function () {
                $window.location.href = '/profile/dashboard';
            }
        };
    }
})();