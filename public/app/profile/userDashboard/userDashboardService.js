/**
 * Created by CSS on 25-05-2016.
 */
/**
 * Created by CSS on 25-05-2016.
 */
angular.module('myApp')
    .factory('userDashboardService', function($http, $window, $q, Upload, $timeout) {
        var httpPromise;
        return {

            pageReload: function () {
                $window.location.reload();
            },

            logout: function () {
                $window.location.href = '/logout';
            },

            userProfile: function () {
                $window.location.href = '/profile/userProfile';
            },

            userDocumentation: function () {
                $window.location.href = '/userDocumentation';
            },

            userProjects: function () {
                $window.location.href = '/project/home'
            },

            userDashbaord: function () {
                $window.location.href = '/profile/userDashboard';
            }

        };
    });
