/**
 * Created by Administrator on 21.07.2016.
 */

(function(){

    angular
        .module("myApp")
        .factory('adminHeaderServices',adminHeaderServices);

    adminHeaderServices.$inject=[
        '$http',
        '$window'
    ];

    function adminHeaderServices($http,$window){
        return{
            goToAdminDashboard: function () {
                $window.location.href = '/profile/dashboard';
            }

        }
    }

})();
