/**
 * Created by Administrator on 21.07.2016.
 */
(function(){
    angular
        .module("myApp")
        .controller('adminHeaderController',adminHeaderController);

    adminHeaderController.$inject=[
        '$scope',
        'adminHeaderServices',
        'spinnerService'
    ];

    function adminHeaderController($scope,adminHeaderServices,spinnerService){

        $scope.goToDashboard = function() {
            spinnerService.show('html5spinner');
            adminHeaderServices.goToAdminDashboard();
        };
    }

})();
