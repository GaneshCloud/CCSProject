/**
 * Created by CSS on 25-05-2016.
 */
(function() {
  angular
      .module('myApp')
      .controller('loginController', loginController);

  loginController.$inject=[
    '$scope',
    'loginService',
    'ngProgressFactory',
    'spinnerService'
  ];

  function loginController($scope,loginService,ngProgressFactory,
                           spinnerService) {

    $scope.progressbar = ngProgressFactory.createInstance();

    $scope.userCredentials = false;

    loginService.profilePage();


    $scope.loginWithFacebook = function() {
      // $scope.progressbar.start();
      spinnerService.show('html5spinner');
      loginService.loginWithFacebook().then(function() {
        // $rootScope.isLogin=true;
        // $scope.progressbar.complete();
        spinnerService.hide('html5spinner');
      });

    };

    $scope.loginWithGoogle = function() {

      // $scope.progressbar.start();
      spinnerService.show('html5spinner');

      loginService.loginWithGoogle().then(function() {
        // $rootScope.isLogin=true;
        // $scope.progressbar.complete();
        spinnerService.hide('html5spinner');
      });

    };

    $scope.isInputValid = function(input) {
      return input.$valid;
    };

    $scope.isInputInvalid = function(input) {
      return input.$dirty && input.$invalid;
    };

    $scope.isPasswordValid = function(newPassword) {
      return newPassword.$valid;
    };

    $scope.isPasswordInvalid = function(newPassword) {
      return newPassword.$dirty && newPassword.$invalid;
    };

    $scope.submit = function(user, password) {
      // $scope.progressbar.start();
      spinnerService.show('html5spinner');
      console.log('username --->' + user);
      loginService.verifyUser(user.$viewValue, password.$modelValue)
          .then(function(result) {
            if (result !== '') {
              loginService.profilePage().then(function() {
                // $scope.progressbar.complete();
                spinnerService.hide('html5spinner');
              });
            }else {
              loginService.loginPageWithError().then(function() {
                // $scope.progressbar.complete();
                spinnerService.hide('html5spinner');
              });
            }
          });

    };

  }
})();