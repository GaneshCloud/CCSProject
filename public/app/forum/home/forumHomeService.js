angular.module('myApp').service('forumService', function($http, $q,$window) {
  return {

    search: function() {

    },

    logout: function() {
      $window.location.href = '/logout';
    },
    goToDashboard: function() {
      $window.location.href = '/profile/userDashboard';
    },

    get: function(type) {
      var defer = $q.defer();
      var httpPromise = $http.get('/forum/getForum?type=' + type);
      httpPromise.then(function(response) {
        defer.resolve(response);
      }, function(error) {
        defer.reject(error);
        throw error;
      });
      return defer.promise;
    },

    postForumquestion: function(data) {
      var defer = $q.defer();
      var httpPromise = $http({
        method: 'post',
        url: '/forum/postForumquestion',
        data: data
      });
      httpPromise.then(function(data) {
        defer.resolve(data);
      }, function(error) {

        defer.reject(error);
        throw error;
      });
      return defer.promise;
    },

    getStar: function(data) {
      var defer = $q.defer();
      var httpPromise = $http({
        method: 'post',
        url: '/forum/rating',
        data: data
      });
      httpPromise.then(function(data) {
        defer.resolve(data);
      }, function(error) {

        defer.reject(error);
        throw error;
      });
      return defer.promise;
    },

    postAnswer: function(input) {
      var defer = $q.defer();
      var httpPromise = $http({
        method: 'post',
        data: input,
        url: '/forum/postAnswer'
      });
      httpPromise.then(function(res) {
        defer.resolve(res);
      }, function(error) {

        defer.reject(error);
        throw error;
      });
      return defer.promise;
    }
  };
});
