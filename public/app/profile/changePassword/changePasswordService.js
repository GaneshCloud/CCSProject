/**
 * Created by CSS on 25-05-2016.
 */
(function() {
  angular
      .module('myApp')
      .factory('changePasswordService', changePasswordService);

  changePasswordService.$inject=[
    '$http',
    '$window',
    '$q'
  ];

  function changePasswordService($http, $window, $q) {
    var httpPromise;
    return {

      pageReload: function () {
        $window.location.reload();
      },

      logout: function () {
        $window.location.href = '/logout';
      },

      getPersonalData: function () {
        var deferred = $q.defer();

        httpPromise = $http.get('/connect/getPersonalData');

        httpPromise.then(function (response) {
          deferred.resolve(response);
        }, function (error) {
          console.error(error);

          $window.location.href = '/logout';
        });

        return deferred.promise;
      },

      updatePersonalData: function (personalData) {
        $http({
          method: 'post',

          url: '/connect/updatePersonalData',

          data: personalData

        });
      },

      profilePage: function () {
        var dfr = $q.defer();

        httpPromise = $http({
          method: 'get',

          url: '/getLoggedInUser'

        });

        httpPromise.then(function (response) {
          dfr.resolve(response);

          if (response.data.userType === 'admin') {
            $window.location.href = '/profile/adminDashboard';
          } else {
            $window.location.href = '/profile/userProfile';
          }
        }, function (error) {
          console.error(error);
        });

        return dfr.promise;
      }

    };
  }
})();
