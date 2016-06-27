/**
 * Created by CSS on 25-05-2016.
 */

(function() {
  angular
      .module('myApp')
      .controller('adminProfileController', adminProfileController);

  adminProfileController.$inject=[
    '$scope',
    '$window',
    'adminProfileService',
    'spinnerService',
    'filterFilter',
    'dashboardService'
  ];

  function adminProfileController($scope,$window,adminProfileService,spinnerService,filterFilter,dashboardService) {

    dashboardService.checkAdmin();

    $scope.userCredentials = false;

    $scope.file = '../images/profile/no_profile.png';

    $scope.noData = true;

    $scope.cur_page = 1;

    $scope.userDetails = [];

    $scope.userDetailsFilter = [];

    $scope.items_per_page = 6;

    $scope.totalLength = 0;

    $scope.max_size = Math.ceil($scope.userDetails / $scope.items_per_page);

    $scope.search = '';

    $scope.showPagination = function() {
      return $scope.noData;
    };

    $scope.getUserDetails = function() {

      adminProfileService.getUserDetails()

          .then(function(response) {

            $scope.userDetails = response.data;

            if ($scope.userDetails.length > 0) {
              $scope.noData = false;

              $scope.totalLength = $scope.userDetails.length;

              $scope.max_size = Math.ceil($scope.totalLength / $scope.items_per_page);

              $scope.$watch('cur_page + items_per_page', function() {

                if($scope.search === '') {

                  var begin = (($scope.cur_page - 1) * $scope.items_per_page), end = begin + $scope.items_per_page;
                  console.log(begin + ' ' + end);
                  $scope.userDetailsFilter = $scope.userDetails.slice(begin, end);
                  // Alert("data"+$scope.searchres);
                }
              });
            }

          }, function(error) {

            console.error(error);

          }) ;

    };

    $scope.goToDashboard = function() {
      spinnerService.show('html5spinner');
      adminProfileService.goToAdminDashboard();
    };

    $scope.getImageSrcProfile = function(user) {

      var img;

      if (user.profilePic) {
        img = '../uploads/profile/' + user.profilePic;
      }else if (user.facebookImage) {
        img = '../uploads/profile/' + user.facebookImage;
      }else if (user.googleImage) {
        img = '../uploads/profile/' + user.googleImage;
      }else {
        img = $scope.file;
      }

      return img;

    };

    $scope.getImageSrc = function(image) {

      var img;

      if (image) {
        img = '../uploads/profile/' + image;
      }else {
        img = $scope.file;
      }
      return img;
    };

    $scope.onLogout = function() {

      if ($window.confirm('Are You Sure ! Do you need to Log Out?')) {
        spinnerService.show('html5spinner');
        dashboardService.logout();

      }

    };

    // $scope.resetFilters = function() {
    //   // Needs to be a function or it won't trigger a $watch
    //   $scope.search = [];
    // };

    // $watch search to update pagination
    $scope.$watch('search', function(newVal, oldVal) {
      console.log('oldVal' + oldVal);
      $scope.userDetailsFilters = filterFilter($scope.userDetails, newVal);
      $scope.totalLength = $scope.userDetailsFilters.length;
      $scope.max_size = Math.ceil($scope.totalLength / $scope.items_per_page);
      $scope.cur_page = 1;
      var begin = (($scope.cur_page - 1) * $scope.items_per_page), end = begin + $scope.items_per_page;
      console.log(begin + ' ' + end);
      $scope.userDetailsFilter = $scope.userDetailsFilters.slice(begin, end);
    }, true);

    $scope.getUserDetails();
  }
})();