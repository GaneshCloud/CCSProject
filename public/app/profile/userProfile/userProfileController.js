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
    'dashboardService',
      'defaultProfilePicture',
      'uploadedProfilePicturePath'
  ];

  function userProfileController($scope,$window,userProfileService,spinnerService,dashboardService,defaultProfilePicture,uploadedProfilePicturePath) {

    dashboardService.checkAdmin();

    $scope.personalData = [];

    $scope.userCredentials = true;

    $scope.editPersonalData = false;

    $scope.imageChanged = false;

    $scope.successMsg = '';

    $scope.showUpdatedStatus = false;

    $scope.fb_link = true;

    $scope.google_link = true;

    $scope.isPasswordEditFormValid = false;

    $scope.dataChanged = false;

    $scope.file = defaultProfilePicture;

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

    // $scope.showFacebookImage = function() {
    //   $scope.file = '../../../uploads/profile/' + $scope.personalData.facebook_img;
    // };
    //
    // $scope.showGoogleImage = function() {
    //   $scope.file = '../../../uploads/profile/' + $scope.personalData.google_img;
    // };
    //
    // $scope.showLocalImg = function() {
    //   $scope.file = '../../../uploads/profile/' + $scope.personalData.profile_pic;
    // };

    $scope.addFacebookAccount = function() {
      spinnerService.show('html5spinner');
      userProfileService.addFacebookAccount().then(function(response) {
        spinnerService.hide('html5spinner');
        $scope.personalData = response.data;
      },function (error) {
        dashboardService.showError(error.data);
      });
    };

    $scope.addGoogleAccount = function() {
      spinnerService.show('html5spinner');
      userProfileService.addGoogleAccount().then(function(response) {
        spinnerService.hide('html5spinner');
        $scope.personalData = response.data;
      },function (error) {
        dashboardService.showError(error.data);
      });
    };

    $scope.uploadFile = function(image) {

      $scope.imageChanged = true;

      $scope.file = image[0];

    };

    $scope.fileUpload = function() {

      if ($window.confirm('Are You Sure ! Do you need to update the ProfilPicture?')) {
        spinnerService.show('html5spinner');
        userProfileService.uploadImage($scope.file).then(function(result) {
          $scope.personalData = result.data;
          spinnerService.hide('html5spinner');
          $scope.imageChanged = false;

          $scope.successMsg = 'Profile Picture Changed!';

          $scope.showUpdatedStatus = true;

        },function(error){
          dashboardService.showError(error.data);
        });

      }

    };

    $scope.onCancelFileUpload = function() {

      $scope.imageChanged = false;
      spinnerService.show('html5spinner');
      userProfileService.getPersonalData().then(function() {
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
        img = uploadedProfilePicturePath + image;
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
        spinnerService.show('html5spinner');
        userProfileService.updatePersonalData($scope.personalData).then(function(result) {
          $scope.personalData = result.data;
          spinnerService.hide('html5spinner');
        },function (error) {
          dashboardService.showError(error.data);
        });

        $scope.successMsg = 'Successfully updated record!';

        $scope.showUpdatedStatus = true;

      }

    };

    $scope.showUpdatedAlert = function () {
      return $scope.showUpdatedStatus;
    };

    $scope.closeAlert = function () {

      $scope.successMsg = '';

      $scope.showUpdatedStatus = false;

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

              $scope.file = uploadedProfilePicturePath + $scope.personalData.profilePic;

              console.log('User Profile Pic --->' + $scope.file);

            }

            if ($scope.personalData.facebookImage !== null) {
              $scope.fb_link = false;
              open();
            }
            if ($scope.personalData.googleImage !== null) {
              $scope.google_link = false;
            }

          }, function(error) {

            console.error(error);
            dashboardService.showError(error.data);

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


