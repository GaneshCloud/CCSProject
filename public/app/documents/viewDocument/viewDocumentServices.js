myApp.factory('viewDocumentServices', function($http) {


  return {
    get: function() {
      return $http.get('/api/docs');
    },
    edit: function(id) {

      return $http.get('/api/docs/edit?id=' + id);
    },
    getDepartment: function() {
      return $http.get('/api/dep');
    },

    Download: function(id) {
      alert(id);
      return $http.post('/api/download',id);
    },

    getArchieve: function(id) {
      return $http.get('/readZip?id=' + id);
    },

    getNextDoc: function(id) {
      return $http.get('/nextDoc?id=' + id);
    },
    getPrevDoc: function(id) {
      return $http.get('/PrevDoc?id=' + id);
    },
    getUser: function() {
      return $http.get('/mode');
    }




  };
});