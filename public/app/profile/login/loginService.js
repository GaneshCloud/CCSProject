/**
 * Created by CSS on 25-05-2016.
 */
(function() {
  angular
      .module('myApp')
      .factory('loginService', loginService);

  loginService.$inject=[
    '$http',
    '$window',
      '$q'
  ];

  function loginService($http, $window,$q) {
    return {

      loginWithFacebook: function () {
        $window.location.href = '/auth/facebook';
      },

      loginWithGoogle: function () {
        $window.location.href = '/auth/google';
      },

      dashboard: function () {
        $window.location.href = '/profile/dashboard';
      },

      verifyUser: function (user, password) {

        var defer = $q.defer();

        $http({
          method: 'post',

          url: '/auth/verifyUser',

          data: {
            user: user,

            password: password

          }

        }).then(function (results) {
          defer.resolve(results);
        },function (error) {
          defer.reject(error);
          $window.location.href = '/error';
        });

        return defer.promise;

      },

      checkUser: function () {
          var dfr = $q.defer();

          var httpPromise = $http({
            method: 'get',

            url: '/getLoggedInUser'

          });

          httpPromise.then(function (response) {
            dfr.resolve(response);

            if(response.data.userType){
              localStorage.setItem('userType',response.data.userType);
              $window.location.href = '/profile/dashboard';
            }
          }, function (error) {
            console.error(error);
          });

          return dfr.promise;
        }

    };
  }
})();