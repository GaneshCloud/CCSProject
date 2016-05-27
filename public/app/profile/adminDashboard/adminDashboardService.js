/**
 * Created by CSS on 25-05-2016.
 */
angular.module('myApp')
    .factory('adminDashboardService', function($http, $window, $q) {
        var httpPromise;
        return {

            pageReload: function () {
                $window.location.reload();
            },

            logout: function () {
                $window.location.href = '/logout';
            },

            adminProfile: function () {
                $window.location.href = '/profile/adminProfile';
            },

            adminDocumentaion: function () {
                $window.location.href = '/documents/singleFileUpload';
            },

            goToAdminDashboard: function () {
                $window.location.href = '/profile/adminDashboard';
            },

            checkAdmin: function () {
                var dfr = $q.defer();

                httpPromise = $http({
                    method: 'get',

                    url: '/getLoggedInUser'

                });

                httpPromise.then(function (response) {
                    dfr.resolve(response);

                    if (response.data.userType === 'admin') {
                        // Already it is in Admin Page
                    } else if(response.data.userType === 'user') {
                        $window.location.href = '/profile/userDashboard';
                    }else {
                        $window.location.href = '/';
                    }
                }, function (error) {
                    console.error(error);
                });

                return dfr.promise;
            }

        };
    });
