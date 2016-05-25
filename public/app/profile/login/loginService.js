/**
 * Created by CSS on 25-05-2016.
 */
angular.module('myApp')
    .factory('loginService', function($http, $window, $q, Upload, $timeout) {
        var httpPromise;
        return {
            
            loginWithFacebook: function () {
                $window.location.href = '/auth/facebook';
            },

            loginWithGoogle: function () {
                $window.location.href = '/auth/google';
            },

            verifyUser: function (user, password) {
                var dfr = $q.defer();

                httpPromise = $http({
                    method: 'post',

                    url: '/auth/verifyUser',

                    data: {
                        user: user,

                        password: password

                    }

                });

                httpPromise.then(function (response) {
                    dfr.resolve(response.data);
                }, function (error) {
                    console.error(error);
                });

                return dfr.promise;
            },

            profilePage: function () {
                var dfr = $q.defer();

                httpPromise = $http({
                    method: 'get',

                    url: '/getPersonalData'

                });

                httpPromise.then(function (response) {
                    dfr.resolve(response);

                    if (response.data.userType === 'admin') {
                        $window.location.href = '/profile/adminDashboard';
                    } else {
                        $window.location.href = '/profile/userDashboard';
                    }
                }, function (error) {
                    console.error(error);
                });

                return dfr.promise;
            }

        }
    });