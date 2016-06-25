/**
 * Created by CSS on 25-05-2016.
 */
(function() {
    angular
        .module('myApp')
        .factory('adminProfileService', adminProfileService);

    adminProfileService.$inject=[
        '$http',
        '$window'
    ];

    function adminProfileService($http, $window) {
        return {

            getUserDetails: function () {

               return $http.get('/getUserDetails');
            },

            goToAdminDashboard: function () {
                $window.location.href = '/profile/dashboard';
            }

        };
    }
})();
