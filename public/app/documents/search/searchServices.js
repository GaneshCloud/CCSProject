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
      search: function(data) {
        return $http.get('/api/search' + data);
      },
      goToDashboard: function() {
        $window.location.href = '/profile/dashboard';
      }
    };
  }
})();