(function() {
  angular
      .module('myApp')
      .controller('homeController', homeController);

  homeController.$inject=[
    '$scope',
    'homeService',
    '$window',
    'dashboardService',
      'spinnerService'
  ];

  function homeController($scope,homeService,$window,dashboardService,spinnerService) {
      $scope.datas = [];
      $scope.events = [];
      $scope.myDataSource = {};
      $scope.images = [];
      var data=[];

      $scope.gotoChat = function() {
          spinnerService.show('html5spinner');
          homeService.chatting();
      };

    $scope.accordionGroupOptions1={
      open:true
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
              data=results.data;
              for (var i = 0;i < data.length;i++) {
                if (i % 2 === 0) {	//Even badge
                  $scope.events.push({badgeClass: 'info', badgeIconClass: 'glyphicon-check', title: data[i].Date, content: data[i].History});
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
                   $scope.totalPercentage = results.data[0].per;
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
     homeService.postQuestion($scope.question)
            .then(function(results) {
              console.log('Data Inserted Successfully');
              //$window.alert('Data Inserted Successfully');
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
