(function() {
  angular.module('myApp')
      .factory('homeService', homeService);

  homeService.$inject=['$http','$window'];

  function homeService($http, $window) {
    return {
      projectData: function () {
        return $http.get('/data');
      },
      projectHistory: function () {
        return $http.get('/projectHistory');
      },
      goToDashboard: function () {
        $window.location.href = '/profile/dashboard';
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