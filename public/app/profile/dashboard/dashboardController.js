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
        
        function checkUserType() {
            
            dashboardService.checkAdmin();
            
        }
        
        checkUserType();

    }
})();