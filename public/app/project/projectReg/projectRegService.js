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

      return $http.post('/editdata', data);

    };

    this.deleteData = function (id) {
      var data = {
        id : id
      };
      return $http.post('/deletedata', data);
    };

    

    this.goToDashboard = function () {
      $window.location.href = '/profile/dashboard';
    };

  }
})();