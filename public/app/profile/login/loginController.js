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
    'spinnerService'
  ];

  function loginController($scope,loginService,
                           spinnerService) {

    $scope.userCredentials = false;

    $scope.credentialsInvalid = false;

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
      spinnerService.show('html5spinner');

      loginService.loginWithGoogle().then(function() {
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
      $scope.credentialsInvalid = false;
      spinnerService.show('html5spinner');
      console.log('username --->' + user);
      loginService.verifyUser(user.$viewValue, password.$modelValue).then(function(result) {
            if (result.data !== '') {
              loginService.dashboard();
            }else {
              loginPageWithError();
            }
          });

    };

    $scope.showCredentialsError = function () {
      return $scope.credentialsInvalid;
    };

    function loginPageWithError(){

        $scope.user = '';
        $scope.password = '';
        $scope.credentialsInvalid = true;
        spinnerService.hide('html5spinner');
        
    }

  }
})();