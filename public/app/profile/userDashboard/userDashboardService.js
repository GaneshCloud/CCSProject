/**
 * Created by CSS on 25-05-2016.
 */
/**
 * Created by CSS on 25-05-2016.
 */
angular.module('myApp')
    .factory('userDashboardService', function($http, $window, $q) {
      var httpPromise;
      return {

        pageReload: function() {
          $window.location.reload();
        },

        logout: function() {
          $window.location.href = '/logout';
        },

        userProfile: function() {
          $window.location.href = '/profile/userProfile';
        },

        userDocumentation: function() {
          $window.location.href = '/documents/documentSearch';
        },

        userProjects: function() {
          $window.location.href = '/project/home';
        },

        checkUser: function() {
          var dfr = $q.defer();

          httpPromise = $http({
            method: 'get',

            url: '/getLoggedInUser'

          });

          httpPromise.then(function(response) {
            dfr.resolve(response);
            if (response.data.userType === 'admin') {
              $window.location.href = '/profile/adminDashboard';
            }else if (response.data.userType === 'user') {
                // Already Screen is in User View
            }else {
              $window.location.href = '/';
            }
          }, function(error) {
            console.error(error);
          });

          return dfr.promise;
        },

        openUserForum: function() {
          $window.location.href = '/forum/home';
        }

      };
    });
