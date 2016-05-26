'use strict';

(function(){

	function uploadController(Upload,$window,$scope,userDashboardService){

        userDashboardService.checkUser();
		//var vm = this;
        $scope.submit = function(){ //function to call on form submit
            if ($scope.uploadForm.file.$valid && $scope.file) { //check if from is valid
                $scope.upload($scope.file); //call upload function
            }
        };

        $scope.onLogout = function(){

            if ($window.confirm("Are You Sure ! Do you need to Log Out?")) {

                $window.location.href = '/logout';

            }

        };
        
        $scope.upload = function (file) {
            Upload.upload({
                url: '/upload', //webAPI exposed to upload the file
                data:{file:file} //pass file as data, should be user ng-model
            }).then(function (resp) { //upload function returns a promise
                if(resp.data.errorCode === 0){ //validate success
                    $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
                } else {
                    $window.alert('an error occured');
                }
            }, function (resp) { //catch error
                console.log('Error status: ' + resp.status);
                $window.alert('Error status: ' + resp.status);
            }, function (evt) {
                console.log(evt);
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                $scope.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
            });
        };
	}
    
	myApp.controller('uploadController',uploadController);
})();