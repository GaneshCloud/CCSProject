/**
 * Created by CSS on 25-05-2016.
 */


(function() {
  angular
      .module('myApp')
      .controller('userProfileController', userProfileController);

  userProfileController.$inject=[
    '$scope',
    '$window',
    'userProfileService',
    'spinnerService',
    'dashboardService'
  ];

  function userProfileController($scope,$window,userProfileService,spinnerService,dashboardService) {

    dashboardService.checkAdmin();

    $scope.personalData = [];

    $scope.userCredentials = true;

    $scope.editPersonalData = false;

    $scope.imageChanged = false;

    $scope.showLocImg = false;

    $scope.showFbImage = false;

    $scope.showGImage = false;

    $scope.fb_link = true;

    $scope.google_link = true;

    $scope.isPasswordEditFormValid = false;

    $scope.dataChanged = false;

    $scope.file = '../../../images/profile/no_profile.png';

    if (!localStorage.$dirty) {

      localStorage.setItem('localView',true);

      localStorage.setItem('facebookView',false);

      localStorage.setItem('googleView',false);

    }

    $scope.goToDashboard = function() {

      userProfileService.goToDashboard();

    };


    $scope.getView = function(value) {

      return ((value === 'local' && localStorage.getItem('localView') === 'true') ||
      (value === 'facebook' && localStorage.getItem('facebookView') === 'true') ||
      (value === 'google' && localStorage.getItem('googleView') === 'true'));

    };

    $scope.viewChange = function(value) {

      if (value === 'local') {

        localStorage.setItem('localView',true);
        localStorage.setItem('facebookView',false);
        localStorage.setItem('googleView',false);

      }else if (value === 'facebook')	{

        localStorage.setItem('facebookView',true);
        localStorage.setItem('googleView',false);
        localStorage.setItem('localView',false);

      }else {

        localStorage.setItem('googleView',true);
        localStorage.setItem('facebookView',false);
        localStorage.setItem('localView',false);

      }

    };


    var year = new Date().getFullYear();
    var range = [];
    for (var i = 1990;i <= year;i++) {
      range.push(i);
    }
    $scope.years = range;

    $scope.dataChanges = function() {
      $scope.dataChanged = true;
    };

    $scope.showFacebookImage = function() {
      $scope.file = '../../../uploads/profile/' + $scope.personalData.facebook_img;
    };

    $scope.showGoogleImage = function() {
      $scope.file = '../../../uploads/profile/' + $scope.personalData.google_img;
    };

    $scope.showLocalImg = function() {
      $scope.file = '../../../uploads/profile/' + $scope.personalData.profile_pic;
    };

    $scope.addFacebookAccount = function() {
      // $scope.progressbar.start();
      spinnerService.show('html5spinner');
      userProfileService.addFacebookAccount().then(function(response) {
        // $scope.progressbar.complete();
        spinnerService.hide('html5spinner');
        $scope.personalData = response.data;
      });
    };

    $scope.addGoogleAccount = function() {
      // $scope.progressbar.start();
      spinnerService.show('html5spinner');
      userProfileService.addGoogleAccount().then(function(response) {
        // $scope.progressbar.complete();
        spinnerService.hide('html5spinner');
        $scope.personalData = response.data;
      });
    };

    $scope.uploadFile = function(image) {

      $scope.imageChanged = true;

      $scope.file = image[0];

    };

    $scope.fileUpload = function() {

      if ($window.confirm('Are You Sure ! Do you need to update the ProfilPicture?')) {
        // $scope.progressbar.start();
        spinnerService.show('html5spinner');
        userProfileService.uploadImage($scope.file).then(function() {
          // $scope.progressbar.complete();
          spinnerService.hide('html5spinner');
          $scope.imageChanged = false;

          angular.element('#result').html('<div class="alert alert-success"><button type="button" class="close">×</button>Profile Picture Changed!</div>');
          $window.setTimeout(function() {
            $('.alert').fadeTo(500, 0).slideUp(500, function() {
              $(this).remove();
            });
          }, 5000);
          $('.alert .close').on('click', function(e) {
            console.log('e' + e);
            $(this).parent().fadeTo(500, 0).slideUp(500);
          });
        });

      }

    };

    $scope.onCancelFileUpload = function() {

      $scope.imageChanged = false;
      // $scope.progressbar.start();
      spinnerService.show('html5spinner');
      userProfileService.getPersonalData().then(function() {
        // $scope.progressbar.complete();
        spinnerService.hide('html5spinner');
      });

    };

    $scope.triggerUpload = function() {
      angular.element('#fileInput').trigger('click');
    };

    $scope.isEmailValid = function(email) {
      return email.$valid;
    };

    $scope.isEmailInvalid = function(email) {
      return email.$dirty && email.$invalid;
    };

    $scope.isContactInvalid = function(contact) {
      return contact.$dirty && contact.$invalid;
    };

    $scope.getImageSrc = function(image) {
      var img = '';
      if (image) {
        img = '../../../uploads/profile/' + image;
      }else {
        img = $scope.file;
      }
      return img;
    };

    $scope.isOldPasswordValid = function(oldPassword) {

      if (oldPassword.$dirty) {

        if (oldPassword.$viewValue === $scope.personalData.password) {

          $scope.isPasswordEditFormValid = true;

          return false;

        }else {

          $scope.isPasswordEditFormValid = false;

          return true;

        }

      }
    };

    $scope.onEditPersonalData = function() {

      $scope.editPersonalData = true;

    };

    $scope.onSubmitPersonalData = function() {

      if ($window.confirm('Are You Sure ! Do you need to update the changes?')) {

        $scope.editPersonalData = false;

        // $scope.progressbar.start();
        spinnerService.show('html5spinner');
        userProfileService.updatePersonalData($scope.personalData).then(function() {
          $scope.progressbar.complete();
          spinnerService.hide('html5spinner');
        });

        angular.element('#result').html('<div class="alert alert-success"><button type="button" class="close">×</button>Successfully updated record!</div>');
        $window.setTimeout(function() {
          $('.alert').fadeTo(500, 0).slideUp(500, function() {
            $(this).remove();
          });
        }, 5000);
        $('.alert .close').on('click', function(e) {
          console.log('e' + e);
          $(this).parent().fadeTo(500, 0).slideUp(500);
        });

      }

    };

    $scope.onCancelPersonalData = function() {

      if ($window.confirm('Are You Sure ! Do you need to leave the changes?')) {

        $scope.dataChanged = false;

        $scope.editPersonalData = false;

        $scope.getPersonalData();
      }

    };

    $scope.onChangePassword = function() {
      if (($scope.personalData.userType !== 'admin') && $scope.personalData.password) {
        // $scope.progressbar.start();
        spinnerService.show('html5spinner');
        userProfileService.changePassword();
      }else {
       $scope.okOnCantChangePassword();
      }
    };

    $scope.okOnCantChangePassword = function() {
      // $scope.progressbar.complete();
      spinnerService.hide('html5spinner');
    };

    $scope.getPersonalData = function() {

      userProfileService.getPersonalData()

          .then(function(response) {

            $scope.personalData = response.data;

            if ($scope.personalData.userType === 'admin') {
              $scope.userCredentials = false;
            }

            if ($scope.personalData.profile_pic !== null) {

              $scope.file = '../../../uploads/profile/' + $scope.personalData.profile_pic;

              console.log('User Profile Pic --->' + $scope.file);

            }

            if ($scope.personalData.facebook_img !== null) {
              $scope.fb_link = false;
              open();
            }
            if ($scope.personalData.google_img !== null) {
              $scope.google_link = false;
            }

          }, function(error) {

            console.error(error);

          });

    };

    function open() {
      // $scope.modalInstance = $modal.open({
      //
      //     Animation: true,
      //     templateUrl: 'modal/chooseProfileViews.html',
      //     controller: 'profileViewModalController',
      //
      // });

    }

    $scope.getPersonalData();

    $scope.onLogout = function() {

      if ($window.confirm('Are You Sure ! Do you need to Log Out?')) {
        // $scope.progressbar.start();
        spinnerService.show('html5spinner');
        dashboardService.logout();

      }

    };

  }
})();


