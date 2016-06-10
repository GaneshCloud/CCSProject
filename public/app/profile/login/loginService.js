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

        }).then(function (results,error) {

          if(error){

              defer.reject(error);

          }

          defer.resolve(results);

        });

        return defer.promise;

      }

    };
  }
})();