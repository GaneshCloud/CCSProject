(function() {
  angular.module('myApp')
      .factory('homeService', homeService);

  homeService.$inject=['$http','$window'];

  function homeService($http, $window) {
    return {
      data: function () {
        return $http.get('/data');
      },
      projectHistory: function () {
        return $http.get('/projectHistory');
      },
      logout: function () {
        $window.location.href = '/logout';
      },
      goToDashboard: function () {
        $window.location.href = '/profile/userDashboard';
      },
      chartData: function () {
        return $http.get('/chartData');
      },
      imageData: function () {
        return $http.get('/imageData');
      },
      postQuestion: function (question) {
        return $http.post('/postQuestion', [question]);
      }
    };
  }
})();