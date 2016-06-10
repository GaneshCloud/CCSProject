(function() {
  angular
      .module('myApp')
      .factory('documentSearchServices', documentSearchServices);

  documentSearchServices.$inject=[
    '$http',
    '$window'
  ];
  function documentSearchServices($http,$window) {
    return {
      get: function() {
        return $http.get('/api/docs');
      },
      search: function(data) {
        return $http.get('/api/search' + data);
      },
      getDepartment: function() {
        return $http.get('/api/dep');
      },
      goToDashboard: function() {
        $window.location.href = '/profile/dashboard';
      }
    };
  }
})();