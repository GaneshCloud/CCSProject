/**
 * Created by CSS on 25-05-2016.
 */
angular.module('myApp')
    .factory('adminProfileService', function($http, $window, $q) {
      var httpPromise;
      return {

        logout: function() {
          $window.location.href = '/logout';
        },

        getUserDetails: function() {
          var deferred = $q.defer();

          httpPromise = $http.get('/getUserDetails');

          httpPromise.then(function(response) {
            deferred.resolve(response);
          }, function(error) {
            console.error(error);
          });

          return deferred.promise;
        },

        goToAdminDashboard: function() {
          $window.location.href = '/profile/adminDashboard';
        }

      };
    });
