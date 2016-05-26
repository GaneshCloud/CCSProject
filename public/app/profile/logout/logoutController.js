/**
 * Created by CSS on 25-05-2016.
 */

(function() {

    function logoutController($scope,ngProgressFactory,$location) {

        $scope.progressbar = ngProgressFactory.createInstance();

        $scope.userCredentials = false;
        
        $location.path='/';

    }

    myApp.controller('logoutController',logoutController);

})();