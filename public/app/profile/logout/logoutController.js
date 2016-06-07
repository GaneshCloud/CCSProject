/**
 * Created by CSS on 25-05-2016.
 */

(function() {

  function logoutController($scope,ngProgressFactory) {

    $scope.progressbar = ngProgressFactory.createInstance();

    $scope.userCredentials = false;

  }

  myApp.controller('logoutController',logoutController);

})();