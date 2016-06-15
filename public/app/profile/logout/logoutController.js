/**
 * Created by CSS on 25-05-2016.
 */

(function() {
  angular
      .module('myApp')
      .controller('logoutController', logoutController);

  logoutController.$inject=[
    '$scope'
  ];

  function logoutController($scope) {
    $scope.userCredentials = false;
  }
})();