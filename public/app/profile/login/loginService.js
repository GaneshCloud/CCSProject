/**
 * Created by CSS on 25-05-2016.
 */
angular.module('myApp')
    .factory('loginService', function($http, $window, $q) {
      var httpPromise;
      return {

        loginWithFacebook: function() {
          $window.location.href = '/auth/facebook';
        },

        loginWithGoogle: function() {
          $window.location.href = '/auth/google';
        },

        verifyUser: function(user, password) {
          var dfr = $q.defer();

          httpPromise = $http({
            method: 'post',

            url: '/auth/verifyUser',

            data: {
              user: user,

              password: password

            }

          });

          httpPromise.then(function(response) {
            dfr.resolve(response.data);
          }, function(error) {
            console.error(error);
          });

          return dfr.promise;
        },

        profilePage: function() {
          var dfr = $q.defer();

          httpPromise = $http({
            method: 'get',

            url: '/connect/getPersonalData'

          });

          httpPromise.then(function(response) {
            dfr.resolve(response);

            if (response.data.userType === 'admin') {
              $window.location.href = '/profile/adminDashboard';
            } else if (response.data.userType === 'user') {
              $window.location.href = '/profile/userDashboard';
            }else {
              $window.location.href = '/';
            }
          }, function(error) {
            console.error(error);
          });

          return dfr.promise;
        }

      };
    });