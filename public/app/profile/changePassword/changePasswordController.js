/**
 * Created by CSS on 25-05-2016.
 */
(function() {
  angular
      .module('myApp')
      .controller('changePasswordController', changePasswordController);

  changePasswordController.$inject=[
    '$scope',
    '$window',
      '$timeout',
    'changePasswordService',
    'spinnerService',
    'dashboardService'
  ];

  function changePasswordController($scope,$window,$timeout,changePasswordService,spinnerService,dashboardService) {

    $scope.userCredentials = false;

    dashboardService.checkAdmin();

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

        if (newPassword.$viewValue === reNewPassword.$viewValue) {

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

        spinnerService.show('html5spinner');

        changePasswordService.updatePersonalData($scope.personalData).then(function(result) {

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

        },function (error) {
          dashboardService.showError(error.data);
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
        changePasswordService.profilePage();

      }

    };

    $scope.getPersonalData = function() {

      changePasswordService.getPersonalData()

          .then(function(response) {

            $scope.personalData = response.data;

            if ($scope.personalData.userType === 'admin') {
              $scope.userCredentials = false;
            }

            if ($scope.personalData.facebookImage !== null) {

              $scope.file = '../images/uploads/' + $scope.personalData.facebookImage;

              console.log('User Profile Pic --->' + $scope.file);

            }

            if ($scope.personalData.facebookImage !== null) {
              $scope.fb_link = false;
            }
            if ($scope.personalData.googleImage !== null) {
              $scope.google_link = false;
            }

          }, function(error) {

            console.error(error);
            dashboardService.showError(error.data);

          });

    };

    $scope.getPersonalData();

  }
})();