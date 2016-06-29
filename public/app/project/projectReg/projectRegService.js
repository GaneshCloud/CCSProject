(function() {
  angular.module('myApp')
      .service('projectRegService', projectRegService);

  projectRegService.$inject=['$http','$window'];

  function projectRegService($http, $window) {


    this.getAllProjects = function () {
      return $http.get('/getAllProjects');
    };


    this.postNewProject = function (data) {

      return $http.post('/postNewProject', data);
    };

    this.updateProject = function (data) {

      return $http.post('/updateProject', data);

    };

    this.deleteProject = function (id) {
      var data = {
        id : id
      };
      return $http.post('/deleteProject', data);
    };
    
    this.goToDashboard = function () {
      $window.location.href = '/profile/dashboard';
    };

  }
})();