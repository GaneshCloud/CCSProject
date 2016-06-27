/**
 * Created by CSS on 25-05-2016.
 */
(function() {
  angular.module('myApp')
      .factory('userProfileService', userProfileService);

  userProfileService.$inject=[
    '$http',
    '$window',
      'Upload'
  ];
  function userProfileService($http, $window,Upload) {
    return {
      changePassword: function () {
        $window.location.href = '/profile/changePassword';
      },

      // pageReload: function () {
      //   $window.location.reload();
      // },

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
        return $http.get('/connect/getPersonalData');
      },

      uploadImage: function (file) {

        return Upload.upload({
          url: '/connect/uploadImage',

          data: {file: file}

        });
      },

      updatePersonalData: function (personalData) {

        return $http({
          method: 'post',

          url: '/connect/updatePersonalData',

          data: personalData

        });
      }

    };
  }
})();
