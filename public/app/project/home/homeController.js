(function() {
  angular
      .module('myApp')
      .controller('homeController', homeController);

  homeController.$inject=[
    '$scope',
    'homeService',
    '$window',
    'dashboardService'
  ];

  function homeController($scope,homeService,$window,dashboardService) {
    $scope.datas = [];
    $scope.events = [];
    $scope.myDataSource = {};
    $scope.images = [];

    $scope.accordionGroupOptions1={
      open:true          // (Default: false) - Whether accordion group is open or closed.
    };
    $scope.accordionGroupOptions2={
      open:true
    };
    $scope.accordionGroupOptions3={
      open:true
    };
    $scope.accordionGroupOptions4={
      open:true
    };
    $scope.accordionGroupOptions5={
      open:true
    };
    $scope.accordionGroupOptions6={
      open:true
    };

    $scope.simpleAccordionOptions = {
      closeOthers: false
    };

    dashboardService.checkAdmin();
    // $scope.projectData();
    // $scope.projectHistory();
    // $scope.chartData();
    // $scope.imageData();

    $scope.onLogout = function() {
      if ($window.confirm('Are You Sure ! Do you need to Log Out?')) {
        dashboardService.logout();
      }
    };


    $scope.goToDashboard = function() {
      homeService.goToDashboard();
    };

    $scope.projectData = function(){
      homeService.projectData()
          .then(function (results) {	//Success function
            $scope.datas = results.data[0];
          }).catch(function (error) {
            console.log('Error');
          });
    };

    $scope.projectHistory = function(){
      homeService.projectHistory()
          .then(function (results) {	//Success function
              var data=[];
              data=results.data;
              for (var i = 0;i < data.length;i++) {
                if (i % 2 === 0) {	//Even badge
                  $scope.events.push({badgeClass: 'info', badgeIconClass: 'glyphicon-check', title: data[i].Date, content:data[i].History});
                }else {	//Odd badge
                  $scope.events.push({badgeClass: 'warning', badgeIconClass: 'glyphicon-credit-card', title: data[i].Date, content: data[i].History});
                }
              }
          }).catch(function (error) {
                console.log('Error');
          });
    };


    $scope.chartData = function(){
      homeService.chartData()
          .then(function (results) {	//Success function
              $scope.totalPercentage = results.data[3].y;
              $scope.myDataSource = {
                chart: {
                  caption: 'Last 4 Days',
                  numberSuffix: '%',
                  theme: 'ocean'
                },
                data: [{
                  label: results.data[0].x,
                  value: results.data[0].y
                },{
                  label: results.data[1].x,
                  value: results.data[1].y
                },{
                  label: results.data[2].x,
                  value: results.data[2].y
                },{
                  label: results.data[3].x,
                  value: results.data[3].y
                }]
              };
          }).catch(function(error) {
            console.log('Error');
          });
    };

    $scope.imageData = function(){
      homeService.imageData()
          .then(function (results) {
            $scope.images = results.data;
          }).catch(function (error) {
            console.log('Error');
          });
    };

    $scope.postData = function() {	//Function to call on question submit
     // if ($scope.question.length > 0) {	//Success funtion
        homeService.postQuestion($scope.question)
            .then(function() {
              console.log('Data Inserted Successfully');
              $window.alert('Data Inserted Successfully');
              $scope.question = '';
            }).catch(function (error) {
              console.log('Error');
            });
    };

    $scope.projectData();
    $scope.projectHistory();
    $scope.chartData();
    $scope.imageData();
  }
})();
