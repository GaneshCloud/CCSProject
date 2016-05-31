/**
 * Created by CSS on 25-05-2016.
 */


(function() {
  function changePasswordController($scope,$window,changePasswordService,ngProgressFactory,spinnerService,userDashboardService) {

    $scope.progressbar = ngProgressFactory.createInstance();

    $scope.userCredentials = false;

    userDashboardService.checkUser();

    $scope.isOldPasswordValid = function(oldPassword) {

      if (oldPassword.$dirty) {

        if (oldPassword.$viewValue === $scope.personalData.password) {

          $scope.isPasswordEditFormValid = true;

          return false;

        } else {

          $scope.isPasswordEditFormValid = false;

          return true;

        }

      }
    };

    $scope.isRePasswordValid = function(newPassword,reNewPassword) {

      if (reNewPassword.$dirty) {

        if (newPassword.$viewValue == reNewPassword.$viewValue) {

          $scope.isPasswordEditFormValid = true;

          return false;

        }else {

          $scope.isPasswordEditFormValid = false;

          return true;

        }

      }

    };

    $scope.isPasswordValid = function(newPassword) {
      return newPassword.$valid;
    };

    $scope.isPasswordInvalid = function(newPassword) {
      return newPassword.$dirty && newPassword.$invalid;
    };

    $scope.updatePassword = function(newPassword) {

      if ($window.confirm('Are You Sure ! Do you need to update the changes?')) {

        $scope.personalData.password = newPassword.$viewValue;

        $scope.progressbar.start();
        spinnerService.show('html5spinner');

        changePasswordService.updatePersonalData($scope.personalData).then(function() {
          $scope.progressbar.complete();
          spinnerService.hide('html5spinner');
          angular.element('#result').html('<div class="alert alert-success"><button type="button" class="close">×</button>Password Changed!</div>');
          $window.setTimeout(function() {
            $('.alert').fadeTo(500, 0).slideUp(500, function() {
              $(this).remove();
            });
          }, 5000);
          $('.alert .close').on('click', function(e) {
            console.log('e' + e);
            $(this).parent().fadeTo(500, 0).slideUp(500);
          });

          $timeout(changePasswordService.profilePage(),6000);

        });

      } else {
        // $scope.progressbar.start();
        spinnerService.show('html5spinner');
        changePasswordService.profilePage().then(function() {
          // $scope.progressbar.complete();
          spinnerService.hide('html5spinner');
        });

      }

    };

    $scope.onCancelChangePassword = function() {

      if ($window.confirm('Are You Sure ! Do you need to leave the changes?')) {
        // $scope.progressbar.start();
        spinnerService.show('html5spinner');
        changePasswordService.profilePage().then(function() {
          // $scope.progressbar.complete();
          spinnerService.hide('html5spinner');
        });

      }

    };

    var getPersonalData = function() {

      changePasswordService.getPersonalData()

                .then(function(response) {

                  $scope.personalData = response.data;

                  if ($scope.personalData.userType === 'admin') {
                    $scope.userCredentials = false;
                  }

                  if ($scope.personalData.facebook_img !== null) {

                    $scope.file = '../images/uploads/' + $scope.personalData.facebook_img;

                    console.log('User Profile Pic --->' + $scope.file);

                  }

                  if ($scope.personalData.facebook_img !== null) {
                    $scope.fb_link = false;
                  }
                  if ($scope.personalData.google_img !== null) {
                    $scope.google_link = false;
                  }

                }, function(error) {

                  console.error(error);

                });

    };

    getPersonalData();

  }

  myApp.controller('changePasswordController',changePasswordController);
})();