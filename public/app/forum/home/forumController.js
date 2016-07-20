
(function() {
  angular
      .module('myApp')
      .controller('forumController', forumController);

  forumController.$inject=[
    '$scope',
    '$window',
    '$rootScope',
    'forumService',
    'dashboardService',
    'spinnerService',
    'filterFilter'
  ];

  function forumController($scope,$window,$rootScope,forumService,dashboardService,spinnerService,filterFilter) {
    $scope.getForumQus = [];
    $scope.qusId = 0;
    $scope.forumtype = 'All';
    $scope.comment = [];
    $scope.colspan = 4;
    $scope.curpage = 1;
    $scope.itemspage = 5;
    $scope.filteredDoc = [];
    $scope.maxSize = 4;
    $scope.totalItems = 0;


    dashboardService.checkAdmin();
    

    // -------------------------lodout------------------------------------------------- //
    $scope.onLogout = function() {

      if ($window.confirm('Are You Sure ! Do you need to Log Out?')) {

        dashboardService.logout();

      }
    };
    // -------------------------Dashboard------------------------------------------------- //
    $scope.goToDashboard = function() {
      forumService.goToDashboard();

    };
    
    // --------------------------------------- GET FORUM QUESTION ANSWERS ----------------//
    $scope.getForumData=function(Type){

      forumService.getForumData(Type).then(function(data) {
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
    };
    // --------------------GET FORUM QUESTION ANSWERS -------------------------------------//

    // ------------------------- POST QUESTION--------------------------------------------- //
    $scope.names = ['General', 'News List'];
    $scope.selectedName = '';
    $scope.postForumQuestion = function() {

      var data =
      {
        question: $scope.post.question,
        Type: $scope.selectedName,
        explation: $scope.post.Explation
      };
      forumService.postForumQuestion(data).then(function() {
        alert('Successfully Inserted');
        $scope.post.question = '';
        $scope.selectedName = '';
        $scope.post.Explation = '';
        $scope.getForumData($scope.forumtype);
      });
    };
    // ------------------------- END-------------------------------------------------------//
    $scope.postStar = function(qusId, star) {
      var data = {
        qusId: qusId,
        star: star
      };
      forumService.postStar(data).then(function() {
        $scope.getForumData($scope.forumtype);
      });
    };
    $scope.toCheck = function(qusId, value) {
      return (qusId === value);

    };
    // -------------------------Get Type---------------------------------------------------- //
    $scope.getType = function() {
      $scope.forumtype = $scope.selectedNames;
      $scope.getForumData($scope.forumtype);
    };
    // ---------------------------- END----------------------------------------------------- //

    // -------------------------POST ANSWER------------------------------------------------- //
    $scope.postAnswer = function(qusId, comment) {
      var data = {
        qusId: qusId,
        comment: comment
      };
      forumService.postAnswer(data).then(function() {
        alert('Data Inserted Successfully');
        $scope.comment = '';
        $scope.getForumData($scope.forumtype);
        
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
      if($scope.search=='')
      {
        var begin = (($scope.curpage - 1) * $scope.itemspage),
            end = begin + $scope.itemspage;
        $scope.filteredDoc = $scope.getForumQus.slice(begin, end);
      }else {
        var begin = (($scope.curpage - 1) * $scope.itemspage),
            end = begin + $scope.itemspage;
        $scope.filteredDoc = $scope.filteredDocs.slice(begin, end);
      }
    }, true);

    // -------------------------alert------------------------------------------------- //
    $scope.change=function(){
      if(!$scope.selectedName.length){
        $window.alert('Please Select Category');
      }

      else if(!$scope.post.question){
        $window.alert('Please Enter Question');
      }
    };
    $scope.getForumData($scope.forumtype);
  }
})();
// ------------------------- END-------------------------------------------------------//
