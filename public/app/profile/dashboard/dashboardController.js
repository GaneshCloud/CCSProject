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
        $scope.request = true;
        
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

        $scope.openMessaging = function() {
            spinnerService.show('html5spinner');
            dashboardService.messaging();
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

        $scope.showMobNo=function(){
            $scope.request = false;
        }
        $scope.hideAlternateNo=function(){

            $scope.userData.msgNumber=$scope.userData.contact;
        }



        $scope.checkUserType = function () {

            dashboardService.checkAdmin().then(function (result) {
                $scope.userData = result;
                if($scope.userData.userid){
                    $scope.unregisteredUser = false;

                    if(($scope.userData.facebookId==null || $scope.userData.msgNumber==null) && $scope.userData.userType!='admin'){
                        setTimeout(function(){
                            document.getElementById("showModel").click();
                        },1000)

                    }
                }else{
                    $scope.unregisteredUser = true;
                }
            });
            
        };

        $scope.onSubmitPersonalData = function() {

            if ($window.confirm('Are You Sure ! Do you need to update the changes?')) {

                $scope.editPersonalData = false;
                spinnerService.show('html5spinner');
                dashboardService.updatePersonalData($scope.userData).then(function(result) {
                    $scope.userData = result.data;
                    spinnerService.hide('html5spinner');
                },function (error) {
                    dashboardService.showError(error.data);
                });

                $scope.successMsg = 'Successfully updated record!';

                $scope.showUpdatedStatus = true;

            }

        };
        $scope.addFacebookAccount = function() {
            spinnerService.show('html5spinner');
            dashboardService.addFacebookAccount();
        };

        $scope.isUnregisteredUser = function () {
            if($scope.unregisteredUser){
                return true;
            }
            return false;
        }

        $scope.checkUserType();
    }
})();