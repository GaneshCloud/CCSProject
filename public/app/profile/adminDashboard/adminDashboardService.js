/**
 * Created by CSS on 25-05-2016.
 */
angular.module('myApp')
    .factory('adminDashboardService', function($http, $window, $q, Upload, $timeout) {
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
                $window.location.href = '/adminDocumentation';
            },

            goToAdminDashboard: function () {
                $window.location.href = '/profile/adminDashboard';
            }

        };
    });
