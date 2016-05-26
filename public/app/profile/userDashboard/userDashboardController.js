/**
 * Created by CSS on 25-05-2016.
 */
/**
 * Created by CSS on 25-05-2016.
 */

(function(){

    function userDashboardController($scope,$window,userDashboardService,forumService,ngProgressFactory,spinnerService){

        userDashboardService.checkUser();
        $scope.progressbar = ngProgressFactory.createInstance();

        $scope.userCredentials = false;

        $scope.openProfilePage = function(){
            $scope.progressbar.start();
            spinnerService.show('html5spinner');
            userDashboardService.userProfile().then(function(){
                $scope.progressbar.complete();
                spinnerService.hide('html5spinner');
            });

        };

        $scope.onLogout = function(){

            if ($window.confirm("Are You Sure ! Do you need to Log Out?")) {
                $scope.progressbar.start();
                spinnerService.show('html5spinner');
                userDashboardService.logout().then(function(){
                    $scope.progressbar.complete();
                    spinnerService.hide('html5spinner');
                });

            }

        };

        $scope.openUserDocumentation = function(){

            $scope.progressbar.start();
            spinnerService.show('html5spinner');
            userDashboardService.userDocumentation().then(function(){
                $scope.progressbar.complete();
                spinnerService.hide('html5spinner');
            });

        };
        
        $scope.openUserProjects = function () {
            $scope.progressbar.start();
            spinnerService.show('html5spinner');
            userDashboardService.userProjects().then(function(){
                $scope.progressbar.complete();
                spinnerService.hide('html5spinner');
            });
        };
        
        $scope.openUserForum=function()
        {
            $scope.progressbar.start();
            spinnerService.show('html5spinner');
            userDashboardService.openUserForum().then(function(){
                $scope.progressbar.complete();
                spinnerService.hide('html5spinner');
            });    
        };

    }

    myApp.controller('userDashboardController',userDashboardController);

})();