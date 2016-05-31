
myApp.controller('searchController', function($scope,documentSearchServices,iconServices,userDashboardService,$window) {

  $scope.searchkey = {};              //Model for search key object
  $scope.searchkey.docType = -1;        //DocType property of search key object
  $scope.searchkey.dep = -1;            //Department property of search key object
  $scope.searchres = [];              //Array for store the search result
  $scope.search = '';                   //Model for searck key
  $scope.curPage = 1;                   //Current page number
  $scope.itemsPage = 6;                 //No of items per page
  $scope.filteredRes = [];             //Filtered result for pagination
  $scope.maxSize = 5;                 //Maximum size of the pages to be show
  $scope.noData = false;                //Model for check the search result is 0 or > 0
  $scope.dep = [];                      //Model for department
  $scope.loadimage = '';                //Model for loading image
  $scope.stLst = false;                 //Model for view mode settings
  $scope.field = 'DOCCAPTION';         //Model for ordering field of data
  $scope.isReverse = false;             //Model for check asc/ desc
  $scope.srcViews = 'app/documents/search/searchTileView.html';//Model for store the path of the html template

  userDashboardService.checkUser();

  //Function for get the css class
  $scope.getClass = function(id) {

    return ($scope.searchkey.docType == id?'active' : '');
  };



  //Function for changing the view of the result
  $scope.changeView = function() {

    if ($scope.stLst === true)    {

      $scope.stLst = false;
      $scope.srcViews = 'app/documents/search/searchTileView.html';
    }    else {
      $scope.stLst = true;
      $scope.srcViews = 'app/documents/search/searchListView.html';
    }
  };


  //Function for getting the icon information from iconServices
  $scope.getIcon = function(id) {

    return iconServices.getIcon(id);
  };


  //Function for department Details
  $scope.getDepartment = function() {
    documentSearchServices.getDepartment()
            .success(function(data) {
              $scope.dep = data;
              $scope.dep.splice(0, 0,
              {DEP_ID: '-1', DEP_NAME: 'All Department'}
              );

            })
            .error(function(err) {
              console.log(err);
            });
  };


  //Function for search the document
  $scope.searchData = function(page) {
    console.log(page);

    documentSearchServices.search('?docType=' + $scope.searchkey.docType + '&dep=' + $scope.searchkey.dep + '&page=' + $scope.page + '&serStr=' + $scope.search)

                .success(function(data) {

                  $scope.searchres = data;
                  console.log(data);
                  $scope.noData = (data.length <= 0);
                  $scope.$watch('curPage + itemspage', function() {

                    var begin = (($scope.curPage - 1) * $scope.itemsPage),end = begin + $scope.itemsPage;
                    console.log(begin + ' ' + end);
                    $scope.filteredRes = $scope.searchres.slice(begin, end);

                  });
                });
  };


  //Function for change the document searching criteria
  $scope.changeDocument = function(id) {
    $scope.searchkey.docType = id;
  };


  //Function for ordering the document
  $scope.orderMe = function(f) {

    if ($scope.field == f) {
      $scope.isReverse = !$scope.isReverse;
      return;
    }

    $scope.field = f;
    $scope.isReverse = false;

  };

  // Lodout
  $scope.onLogout = function() {

    if ($window.confirm('Are You Sure ! Do you need to Log Out?')) {

      documentSearchServices.logout();

    }

  };
  //Dashboard
  $scope.goToDashboard = function() {

    documentSearchServices.goToDashboard();

  };
  //Initially calls the function
  $scope.searchData();
  $scope.getDepartment();


});











