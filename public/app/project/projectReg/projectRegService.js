(function() {
  angular.module('myApp')
      .service('projectRegService', projectRegService);

  projectRegService.$inject=['$http','$window'];

  function projectRegService($http, $window) {


    this.getFeedbacks = function () {
      return $http.get('/getdata');
    };


    this.postData = function (data) {

      return $http.post('/postdata', data);
    };

    this.updateData = function (data) {

      return $http.put('/editdata', data);

    };

    this.deleteData = function (id) {
      return $http.delete('/deletedata/' + id);
    };
    this.goToDashboard = function () {
      $window.location.href = '/profile/dashboard';
    };

  }
})();