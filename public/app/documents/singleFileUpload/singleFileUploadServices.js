(function() {
  angular
      .module('myApp')
      .factory('uploadSingleServices', uploadSingleServices);

  uploadSingleServices.$inject=[
    '$http',
    '$window'
  ];

  function uploadSingleServices($http, $window) {
    return {
      create: function (docData) {
        return $http.post('/upload', docData);
      },
      getDocument: function (id) {
        return $http.get('/api/docs/getDoc?id=' + id);
      },
      getDepartment: function () {
        return $http.get('/api/dep');
      },
      multipleFileUpload: function () {
        $window.location.href = '/documents/multipleFileUpload';
      },
      documentList: function () {
        $window.location.href = '/documents/documentList';
      },
      goToDashboard: function () {
        $window.location.href = '/profile/dashboard';
      }
    };
  }
})();