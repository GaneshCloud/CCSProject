(function() {
    angular
        .module('myApp')
        .factory('fileUploadServices', fileUploadServices);

    fileUploadServices.$inject=[
        '$http',
        '$window'
    ];

    function fileUploadServices($http,$window) {
        return {
            create: function (docData) {
                return $http.post('/uploadMulti', docData);
            },
            getDocument: function (id) {
                return $http.get('/api/docs/getDoc?id=' + id);
            },
            // getDepartment: function () {
            //     return $http.get('/api/dep');
            // },
            // singleFileUpload: function () {
            //     $window.location.href = '/documents/singleFileUpload';
            // },
            goToDashboard: function () {
                $window.location.href = '/profile/dashboard';
            }
        };
    }
})();