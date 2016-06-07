(function() {

  function homeController($scope,homeService,$window,userDashboardService) {
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
      closeOthers: true
    };

    userDashboardService.checkUser();

    $scope.onLogout = function() {
      if ($window.confirm('Are You Sure ! Do you need to Log Out?')) {
        homeService.logout();
      }
    };

    $scope.goToDashboard = function() {
      homeService.goToDashboard();
    };

    homeService.data().success(function(results) {	//Success function
      if (results.length > 0) {
        $scope.Total = results[0].Amount;
        $scope.Paid = results[0].Paid;
        $scope.PCode = results[0].PCode;
        $scope.Title = results[0].Title;
        $scope.DeliveryDate = results[0].DeliveryDate;
        $scope.HandledBy = results[0].HandledBy;
        $scope.EmpContact = results[0].EmpContact;
        $scope.Manager = results[0].Manager;
        $scope.ManagerContact = results[0].ManagerContact;
      }else {
        console.log('No data found whe get /data');
      }
    }).error(function(err) {	//Error function
      console.log('Error When get /data : ' + err);
    });

    homeService.projectHistory().success(function(results) {	//Success function
      if (results.length > 0) {
        for (var i = 0;i < results.length;i++) {
          if (i % 2 === 0) {	//Even badge
            $scope.events.push({badgeClass: 'info', badgeIconClass: 'glyphicon-check', title: results[i].Date, content: results[i].History});
          }else {	//Odd badge
            $scope.events.push({badgeClass: 'warning', badgeIconClass: 'glyphicon-credit-card', title: results[i].Date, content: results[i].History});
          }
        }
      }else {
        console.log('No data found whe get /projectHistory');
      }
    }).error(function(err) {	//Error function
      console.log('Error when get /projectHistory' + err);
    });


    homeService.chartData().success(function(results) {	//Success function
      if (results.length > 0) {
        $scope.totalPercentage = results[3].y;
        $scope.myDataSource = {
                      chart: {
                        caption: 'Last 4 Days',
                        numberSuffix: '%',
                        theme: 'ocean'
                      },
                      data: [{
                        label: results[0].x,
                        value: results[0].y
                      },{
                        label: results[1].x,
                        value: results[1].y
                      },{
                        label: results[2].x,
                        value: results[2].y
                      },{
                        label: results[3].x,
                        value: results[3].y
                      }]
                    };
      }else {
        console.log('No data found whe get /chartData');
      }
    })
    .error(function(err) {	//Error function
      console.log('Error When get /chartData : ' + err);
    });
    homeService.imageData().success(function(results) {	//Success function
      if (results.length > 0) {
        $scope.images = results;
      }else {
        console.log('No Project Image Found');
      }
    }).error(function(err) {	//Error function
      console.log('Error when get /imageData : ' + err);
    });

    $scope.postData = function() {	//Function to call on question submit
      if ($scope.question.length > 0) {	//Success funtion
        homeService.postQuestion($scope.question).success(function() {
          console.log('Data Inserted Successfully');
          $window.alert('Data Inserted Successfully');
          $scope.question = '';
        }).error(function(err) {	//Error function
          console.log('Error when /postQuestion : ' + err);
          $window.alert('Data save Failed');
        });
      }else {
        console.log('question length is zero');
      }
    };
  }

  myApp.controller('homeController',homeController);
})();
