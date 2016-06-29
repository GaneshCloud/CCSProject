/**
 * Created by CSS on 25-05-2016.
 */
(function() {
  angular
      .module('myApp')
      .factory('changePasswordService', changePasswordService);

  changePasswordService.$inject=[
    '$http',
    '$window'
  ];

  function changePasswordService($http, $window) {
    return {

      // pageReload: function () {
      //   $window.location.reload();
      // },

      logout: function () {
        $window.location.href = '/logout';
      },

      getPersonalData: function () {

       return $http.get('/connect/getPersonalData');
      },

      updatePersonalData: function (personalData) {
        return $http({
          method: 'post',

          url: '/connect/updatePersonalData',

          data: personalData

        });
      },

      profilePage: function () {

          if (localStorage.getItem('userType')) {
            $window.location.href = '/profile/dashboard';
          }
        
      }

    };
  }
})();
