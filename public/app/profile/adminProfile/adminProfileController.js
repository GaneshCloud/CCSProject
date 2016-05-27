/**
 * Created by CSS on 25-05-2016.
 */

(function() {

    function adminProfileController($scope,$window,adminProfileService,
                                    ngProgressFactory,spinnerService,filterFilter,adminDashboardService) {
        
        adminDashboardService.checkAdmin();

        $scope.progressbar = ngProgressFactory.createInstance();

        $scope.userCredentials = false;

        $scope.file = '../images/profile/no_profile.png';

        $scope.noData = true;

        $scope.cur_page = 1;

        $scope.userDetails = [];

        $scope.userDetailsFilter = [];

        $scope.items_per_page = 6;

        $scope.totalLength = 0;

        $scope.max_size = Math.ceil($scope.userDetails / $scope.items_per_page);

        $scope.search = [];

        $scope.showPagination = function() {
            return $scope.noData;
        };

        var getUserDetails = function() {

            adminProfileService.getUserDetails()

                .then(function(response) {

                    $scope.userDetails = response.data;

                    if ($scope.userDetails.length > 0) {
                        $scope.noData = false;

                        $scope.totalLength = $scope.userDetails.length;

                        $scope.max_size = Math.ceil($scope.totalLength / $scope.items_per_page);

                        $scope.$watch('cur_page + items_per_page', function() {

                            var begin = (($scope.cur_page - 1) * $scope.items_per_page), end = begin + $scope.items_per_page;
                            console.log(begin + ' ' + end);
                            $scope.userDetailsFilter = $scope.userDetails.slice(begin, end);
                            // Alert("data"+$scope.searchres);
                        });
                    }

                }, function(error) {

                    console.error(error);

                }) ;

        };

        $scope.goToDashboard = function() {
            // $scope.progressbar.start();
            spinnerService.show('html5spinner');
            adminProfileService.goToAdminDashboard().then(function() {
                // $scope.progressbar.complete();
                spinnerService.hide('html5spinner');
            });
        };

        $scope.getImageSrcProfile = function(user) {

            var img;

            if (user.profile_pic) {
                img = '../uploads/profile/' + user.profile_pic;
            }else if (user.facebook_img) {
                img = '../uploads/profile/' + user.facebook_img;
            }else if (user.google_img) {
                img = '../uploads/profile/' + user.google_img;
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
                // $scope.progressbar.start();
                spinnerService.show('html5spinner');
                adminProfileService.logout().then(function() {
                    // $scope.progressbar.complete();
                    spinnerService.hide('html5spinner');
                });

            }

        };

        $scope.resetFilters = function() {
            // Needs to be a function or it won't trigger a $watch
            $scope.search = [];
        };

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

        getUserDetails();


    }

    myApp.controller('adminProfileController',adminProfileController);

})();