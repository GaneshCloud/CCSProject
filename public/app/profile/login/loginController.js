/**
 * Created by CSS on 25-05-2016.
 */
(function() {
  angular
      .module('myApp')
      .controller('loginController', loginController);

  loginController.$inject=[
    '$scope',
      '$window',
    'loginService',
    'spinnerService'
  ];

  function loginController($scope,$window,loginService,
                           spinnerService) {

    $scope.userCredentials = false;

    $scope.credentialsInvalid = false;

    loginService.checkUser();


    $scope.loginWithFacebook = function() {
      spinnerService.show('html5spinner');
      loginService.loginWithFacebook();

    };

    $scope.loginWithGoogle = function() {
      spinnerService.show('html5spinner');

      loginService.loginWithGoogle();

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
      // console.log("data"+loginService.verifyUser(user.$viewValue, password.$modelValue) );
      loginService.verifyUser(user.$viewValue,password.$modelValue).then(function (result) {


        if(result.data === 'Warning'){
          $scope.loginPageWithError();
        }else {
          loginService.dashboard();
        }
      },function (error) {

        if(error){
          loginService.showError(error.data);
        }
      });

    };

    $scope.showCredentialsError = function () {
      return $scope.credentialsInvalid;
    };

    $scope.loginPageWithError = function () {

        $scope.user = '';
        $scope.password = '';
        $scope.credentialsInvalid = true;
        spinnerService.hide('html5spinner');
        
    };

  }
})();