/**
 * Created by CSS on 25-05-2016.
 */
angular.module('myApp')
    .factory('userProfileService', function($http, $window, $q, Upload, $timeout) {
        var httpPromise;
        return {
            changePassword: function () {
                $window.location.href = '/changePassword';
            },

            pageReload: function () {
                $window.location.reload();
            },

            goToDashboard:function () {
                $window.location.href = '/profile/userDashboard';
            },

            addFacebookAccount: function () {
                $window.location.href = '/connect/facebook';
            },

            addGoogleAccount: function () {
                $window.location.href = '/connect/google';
            },

            logout: function () {
                $window.location.href = '/logout';
            },

            getPersonalData: function () {
                var deferred = $q.defer();

                httpPromise = $http.get('/getPersonalData');

                httpPromise.then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    console.error(error);

                    $window.location.href = '/error';
                });

                return deferred.promise;
            },

            uploadImage: function (file) {
                var dfr = $q.defer();

                httpPromise = Upload.upload({
                    url: '/uploadImage',

                    data: {file: file}

                });

                httpPromise.then(function (response) {
                    dfr.resolve(response);
                }, function (error) {
                    console.error(error);
                });
                return dfr.promise;
            },

            updatePersonalData: function (personalData) {
                $http({
                    method: 'post',

                    url: '/updatePersonalData',

                    data: personalData

                });
            }

        };
    });
