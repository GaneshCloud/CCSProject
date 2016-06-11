/**
 * Created by CSS on 25-05-2016.
 */
(function() {
  angular.module('myApp')
      .factory('userProfileService', userProfileService);

  userProfileService.$inject=[
    '$http',
    '$window',
    '$q'
  ];
  function userProfileService($http, $window, $q, Upload) {
    var httpPromise;
    return {
      changePassword: function () {
        $window.location.href = '/profile/changePassword';
      },

      pageReload: function () {
        $window.location.reload();
      },

      goToDashboard: function () {
        $window.location.href = '/profile/dashboard';
      },

      addFacebookAccount: function () {
        $window.location.href = '/auth/facebook';
      },

      addGoogleAccount: function () {
        $window.location.href = '/auth/google';
      },

      getPersonalData: function () {
        var deferred = $q.defer();

        httpPromise = $http.get('/connect/getPersonalData');

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

        var dfr = $q.defer();

        httpPromise = $http({
          method: 'post',

          url: '/connect/updatePersonalData',

          data: personalData

        });
        httpPromise.then(function (response) {
          dfr.resolve(response);
        }, function (error) {
          console.error(error);
        });
        return dfr.promise;
      }

    };
  }
})();
