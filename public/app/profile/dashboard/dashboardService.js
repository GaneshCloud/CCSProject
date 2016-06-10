/**
 * Created by CSS on 10-06-2016.
 */
/**
 * Created by CSS on 25-05-2016.
 */
(function() {
    angular
        .module('myApp')
        .factory('dashboardService', dashboardService);

    dashboardService.$inject=[
        '$http',
        '$window',
        '$q'
    ];

    function dashboardService($http, $window, $q) {
        var httpPromise;
        return {

            pageReload: function () {
                $window.location.reload();
            },

            logout: function () {
                localStorage.clear();
                $window.location.href = '/logout';
            },

            profile: function () {
                if (localStorage.getItem('userType') === 'admin') {
                    $window.location.href = '/profile/adminProfile';
                }else{
                    $window.location.href = '/profile/userProfile';
                }
            },

            documentation: function () {
                if (localStorage.getItem('userType') === 'admin') {
                    $window.location.href = '/documents/singleFileUpload';
                }else{
                    $window.location.href = '/documents/documentSearch';
                }
            },

            project: function () {
                if(localStorage.getItem('userType') === 'admin') {
                    $window.location.href = '/project/projectReg';
                }else{
                    $window.location.href = '/project/home';
                }
            },

            forum:function () {
                if(localStorage.getItem('userType') === 'admin') {
                    //Not for Admin
                }else{
                    $window.location.href = '/forum/home';
                }
            },

            goToDashboard: function () {
                $window.location.href = '/profile/dashboard';
            },

            checkAdmin: function () {
                var dfr = $q.defer();

                httpPromise = $http({
                    method: 'get',

                    url: '/getLoggedInUser'

                });

                httpPromise.then(function (response) {
                    dfr.resolve(response);

                    if(response.data.userType){
                        localStorage.setItem('userType',response.data.userType);
                    }else {
                        $window.location.href = '/';
                    }
                }, function (error) {
                    console.error(error);
                });

                return dfr.promise;
            }

        };
    }
})();
