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
        '$window'
    ];

    function dashboardService($http, $window) {
        return {

            // pageReload: function () {
            //     $window.location.reload();
            // },

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

            waterMark: function () {
                //if (localStorage.getItem('userType') === 'admin') {
                    $window.location.href = '/documents/waterMarkModule';
               // }else{
                    // $window.location.href = '/documents/home';
                // }
            },

            project: function () {
                if(localStorage.getItem('userType') === 'admin') {
                    $window.location.href = '/project/projectReg';
                }else{
                    $window.location.href = '/project/home';
                }
            },
            messaging: function () {
                if(localStorage.getItem('userType') === 'admin') {
                    $window.location.href = 'sms/sendMessage';
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

                return $http({
                    method: 'get',

                    url: '/getLoggedInUser'

                }).then(function (response) {
                    if(response.data.userType){
                        localStorage.setItem('userType',response.data.userType);
                        return response.data;
                    }else {
                        $window.location.href = '/';
                    }
                }, function (error) {

                    $window.location.href = '/error';
                    console.error(error);
                });

            },
            updatePersonalData: function (personalData) {

                return $http({
                    method: 'post',

                    url: '/connect/updatePersonalData',

                    data: personalData

                });
            },
            addFacebookAccount: function () {
                $window.location.href = '/auth/facebook';
            },
            showError:function (error) {
                if(error.error.code !== null){
                    localStorage.setItem('errorCode',error.error.code);
                }
                if(error.error.errno !== null){
                    localStorage.setItem('errorNum',error.error.errno);
                }
                if(error.error.fatal !== null){
                    localStorage.setItem('fatal',error.error.fatal);
                }
                if(error.error.sqlState !== null){
                    localStorage.setItem('sqlState',error.error.sqlState);
                }
                if(error.error.index !== null){
                    localStorage.setItem('index',error.error.index);
                }
                $window.location.href = '/error/message';
            },

        };
    }
})();
