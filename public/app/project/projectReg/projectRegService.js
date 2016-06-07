myApp.service('projectRegService',function($http,$window) {


  this.getFeedbacks = function()  {
    return $http.get('/getdata');
  };


  this.postData = function(data)  {

    return $http.post('/postdata',data);
  };

  this.updateData = function(data)  {

    return $http.post('/editdata',data);

  };

  this.deleteData = function(id)  {
    return $http.delete('/deletedata/' + id);
  };
  this.logout = function() {
    $window.location.href = '/logout';
  };
  this.goToDashboard = function() {
    $window.location.href = '/profile/adminDashboard';
  };

});