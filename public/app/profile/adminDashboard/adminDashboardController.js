/**
 * Created by CSS on 25-05-2016.
 */

(function(){

    function adminDashboardController($scope,$window,adminDashboardService,ngProgressFactory,spinnerService){

        $scope.progressbar = ngProgressFactory.createInstance();

        $scope.userCredentials = false;

        $scope.openProfilePage = function(){
            $scope.progressbar.start();
            spinnerService.show('html5spinner');
            adminDashboardService.adminProfile().then(function(){
                $scope.progressbar.complete();
                spinnerService.hide('html5spinner');
            });

        };

        $scope.onLogout = function(){

            if ($window.confirm("Are You Sure ! Do you need to Log Out?")) {
                $scope.progressbar.start();
                spinnerService.show('html5spinner');
                adminDashboardService.logout().then(function(){
                    $scope.progressbar.complete();
                    spinnerService.hide('html5spinner');
                });

            }

        };

        $scope.openAdminDocumentation = function(){

            $scope.progressbar.start();
            spinnerService.show('html5spinner');
            adminDashboardService.adminDocumentaion().then(function(){
                $scope.progressbar.complete();
                spinnerService.hide('html5spinner');
            });

        };

    }

    myApp.controller('adminDashboardController',adminDashboardController);

})();