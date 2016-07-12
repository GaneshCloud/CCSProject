/**
 * Created by CSS on 10-06-2016.
 */
/**
 * Created by CSS on 25-05-2016.
 */

(function() {
    angular
        .module('myApp')
        .controller('dashboardController', dashboardController);

    dashboardController.$inject=[
        '$scope',
        '$window',
        'dashboardService',
        'spinnerService'
    ];

    function dashboardController($scope,$window,dashboardService,spinnerService) {

        $scope.userCredentials = false;
        $scope.unregisteredUser = false;
        $scope.userData = [];

        $scope.openProfilePage = function() {
            spinnerService.show('html5spinner');
            dashboardService.profile();

        };

        $scope.onLogout = function() {

            if ($window.confirm('Are You Sure ! Do you need to Log Out?')) {
                spinnerService.show('html5spinner');
                dashboardService.logout();

            }

        };

        $scope.openDocumentation = function() {
            spinnerService.show('html5spinner');
            dashboardService.documentation();

        };

        $scope.openWaterMark = function() {
            spinnerService.show('html5spinner');
            dashboardService.waterMark();

        };

        $scope.openProject = function() {
            spinnerService.show('html5spinner');
            dashboardService.project();
        };

        $scope.openForum = function() {
            spinnerService.show('html5spinner');
            dashboardService.forum();
        };

        $scope.showOnlyForUser = function () {

            if(localStorage.getItem('userType') === 'user'){
                return true;
            }

            return false;

        };
        
        $scope.checkUserType = function () {

            dashboardService.checkAdmin().then(function (result) {
                $scope.userData = result;
                if($scope.userData.userid){
                    $scope.unregisteredUser = false;
                }else{
                    $scope.unregisteredUser = true;
                }
            });
            
        };

        $scope.isUnregisteredUser = function () {
            return $scope.unregisteredUser;
        }
        
        $scope.checkUserType();

    }
})();