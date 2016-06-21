(function() {
  angular
      .module('myApp')
      .factory('viewDocumentServices', viewDocumentServices);

  viewDocumentServices.$inject=['$http'];

  function viewDocumentServices($http) {
    return {
      getDocument: function (id) {
        return $http.get('/api/docs/getDoc?id=' + id);
      },
      download: function (id) {
        alert(id);
        return $http.post('/api/download', id);
      },
      getArchieve: function (id) {
        return $http.get('/readZip?id=' + id);
      },
      getNextDoc: function (id) {
        return $http.get('/nextDoc?id=' + id);
      },
      getPrevDoc: function (id) {
        return $http.get('/PrevDoc?id=' + id);
      },
      getUser: function () {
        return $http.get('/mode');
      }
    };
  }
})();