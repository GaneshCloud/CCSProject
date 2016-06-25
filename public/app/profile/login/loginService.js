/**
 * Created by CSS on 25-05-2016.
 */
(function() {
  angular
      .module('myApp')
      .factory('loginService', loginService);

  loginService.$inject=[
    '$http',
    '$window'
  ];

  function loginService($http, $window) {
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

        return $http({
          method: 'post',

          url: '/auth/verifyUser',

          data: {
            user: user,

            password: password

          }

        });
      },

      checkUser: function () {

          return $http({
            method: 'get',

            url: '/getLoggedInUser'

          }).then(function (response) {
            if(response.data.userType){
              localStorage.setItem('userType',response.data.userType);
              $window.location.href = '/profile/dashboard';
            }
          }, function (error) {
            $window.location.href = '/error';
            console.error(error);
          });

        }

    };
  }
})();