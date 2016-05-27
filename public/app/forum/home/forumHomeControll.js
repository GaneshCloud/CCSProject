(function() {
  function forumController($scope,$window,forumService,filterFilter) {
    $scope.getForumQus = [];
    $scope.Forumanswers = [];
    $scope.Question = '';
    $scope.qusId = 0;
    $scope.forumtype = 'All';
    $scope.Comment = [];
    $scope.colspan = 3;
    $scope.curpage = 1;
    $scope.itemspage = 5;
    $scope.filteredDoc = [];
    $scope.maxSize = 4;
    $scope.totalItems = 0;


    // -------------------------lodout------------------------------------------------- //
    $scope.onLogout = function(){

      if ($window.confirm("Are You Sure ! Do you need to Log Out?")) {

        forumService.logout();

      }

    };
    // -------------------------Dashboard------------------------------------------------- //
    $scope.goToDashboard = function(){

      forumService.goToDashboard();

    };




    // --------------------------------------- GET FORUM QUESTION ANSWERS ----------------//

    function getForum(Type) {

      forumService.get(Type).then(function(data) {
        $scope.getForumQus = data.data;
        $scope.getForumQus.colspan = $scope.colspan;
        $scope.fliter = data.data.length;
        $scope.totalItems = $scope.getForumQus.length;
        $scope.$watch('curpage + itemspage', function() {
          var begin = (($scope.curpage - 1) * $scope.itemspage),
            end = begin + $scope.itemspage;
          $scope.filteredDoc = $scope.getForumQus.slice(begin, end);
        });
      });
    }
    // --------------------GET FORUM QUESTION ANSWERS -------------------------------------//

    // ------------------------- POST QUESTION--------------------------------------------- //
    $scope.names = ['General', 'News List'];
    $scope.selectedName = '';
    $scope.postForumquestion = function() {

      var data =
      {
        question: $scope.post.question,
        Type: $scope.selectedName,
        explation: $scope.post.Explation
      };
      forumService.postForumquestion(data).then(function() {
        $scope.post.question = '';
        $scope.selectedName = '';
        $scope.post.Explation = '';
        alert('Successfully Inserted');
        getForum($scope.forumtype);
      });
    };
    // ------------------------- END-------------------------------------------------------//
    $scope.getStar = function(qusId, star) {
      var data = [qusId, star];
      forumService.getStar(data).then(function() {
        getForum($scope.forumtype);
      });
    };
    $scope.toCheck = function(qusId, value) {
      return (qusId == value);

    };
    // -------------------------Get Type---------------------------------------------------- //
    $scope.GetType = function() {
      $scope.forumtype = $scope.Category;
      getForum($scope.forumtype);
    };
    // ---------------------------- END----------------------------------------------------- //

    // -------------------------POST ANSWER------------------------------------------------- //
    $scope.postAnswer = function(qusId, Comment) {
        var data = {
          qusId: qusId,
          Comment: Comment,
        };
      forumService.postAnswer(data).then(function() {
          alert('Data Inserted Successfully');
          $scope.Comment = '';
        getForum($scope.forumtype);
        //GetForum($scope.answer.Answers);
        });


      };

// -------------------------Search------------------------------------------------- //
    $scope.sort = function(keyname) {
      $scope.sortKey = keyname;
      $scope.reverse = !$scope.reverse;
    };
    $scope.search = [];
    $scope.resetFilters = function() {
      $scope.search = {};
    };
    $scope.$watch('search', function(newVal) {
      $scope.filteredDocs = filterFilter($scope.getForumQus, newVal);
      $scope.totalItems = $scope.filteredDocs.length;
      $scope.curpage = 1;
      var begin = (($scope.curpage - 1) * $scope.itemspage),
          end = begin + $scope.itemspage;
      $scope.filteredDoc = $scope.filteredDocs.slice(begin, end);
    }, true);


    getForum($scope.forumtype);
  }
  myApp.controller('forumController', forumController);
})();
// ------------------------- END-------------------------------------------------------//
