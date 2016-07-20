(function() {
  angular
      .module('myApp')
      .service('forumService', forumService);

  forumService.$inject = [
    '$http',
    '$q',
    '$window'
  ];

  function forumService($http,$q,$window) {
    return {

      
      goToDashboard: function () {
        $window.location.href = '/profile/dashboard';
      },

      getForumData: function (type) {
        return $http.get('/forum/getForum?type=' + type);
      },

      postForumQuestion: function (data) {

        return $http({
          method: 'post',
          url: '/forum/postForumquestion',
          data: data
        });
      },

      postStar: function (data) {
        return $http({
          method: 'post',
          url: '/forum/rating',
          data: data
        });
      },

      postAnswer: function (input) {
        return $http({
          method: 'post',
          data: input,
          url: '/forum/postAnswer'
        });
      }
    }
  }
})();
