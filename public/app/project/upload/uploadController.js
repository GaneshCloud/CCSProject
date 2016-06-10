
(function() {
  angular.module('myApp')
      .controller('uploadController', uploadController);

  uploadController.$inject=[
    'Upload',
    '$window',
    '$scope',
    'userDashboardService'
  ];

  function uploadController(Upload,$window,$scope,userDashboardService) {

    userDashboardService.checkUser();
    //Var vm = this;
    $scope.submit = function() { //Function to call on form submit
      if ($scope.uploadForm.file.$valid && $scope.file) { //Check if from is valid
        $scope.upload($scope.file); //Call upload function
      }
    };

    $scope.onLogout = function() {

      if ($window.confirm('Are You Sure ! Do you need to Log Out?')) {

        $window.location.href = '/logout';

      }
    };

    $scope.upload = function(file) {
      Upload.upload({
        url: '/upload', //WebAPI exposed to upload the file
        data: {file: file} //Pass file as data, should be user ng-model
      }).then(function(resp) { //Upload function returns a promise
        if (resp.data.errorCode === 0) { //Validate success
          $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
        } else {
          $window.alert('an error occured');
        }
      }, function(resp) { //Catch error
        console.log('Error status: ' + resp.status);
        $window.alert('Error status: ' + resp.status);
      }, function(evt) {
        console.log(evt);
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        $scope.progress = 'progress: ' + progressPercentage + '% '; // Capture upload progress
      });
    };
  }
})();