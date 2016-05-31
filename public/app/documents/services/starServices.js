myApp.factory('starServices', function($http) {

  return {
    setStar: function(data) {
      return $http.post('/api/setStar',data);
    },
    getStar: function(data) {
      return $http.get('/api/getStar' + data);
    },
    getStarInfo: function(id) {
      return $http.get('/getRatingInfo?id=' + id);
    }


  };

});