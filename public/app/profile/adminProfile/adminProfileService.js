/**
 * Created by CSS on 25-05-2016.
 */
(function() {
    angular
        .module('myApp')
        .factory('adminProfileService', adminProfileService);

    adminProfileService.$inject=[
        '$http',
        '$window',
        '$q'
    ];

    function adminProfileService($http, $window, $q) {
        var httpPromise;
        return {

            getUserDetails: function () {
                var deferred = $q.defer();

                httpPromise = $http.get('/getUserDetails');

                httpPromise.then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    console.error(error);
                });

                return deferred.promise;
            },

            goToAdminDashboard: function () {
                $window.location.href = '/profile/dashboard';
            }

        };
    }
})();
