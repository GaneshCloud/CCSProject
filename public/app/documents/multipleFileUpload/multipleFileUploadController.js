(function() {
    angular
        .module('myApp')
        .controller('multipleFileUploadController', multipleFileUploadController);

    multipleFileUploadController.$inject = [
        '$scope',
        'uploadMultipleServices',
        'dashboardService',
        '$window'
    ];
    function multipleFileUploadController($scope, uploadMultipleServices, dashboardService, $window) {

        $scope.formData = [{
            ID: '',
            DOC_CAPTION: '',
            DOC_TYPE: '',
            DOC_DEP: '',
            DOC_KEY: '',
            DOC_DESC: '',
            DOC_FILE: ''
        }];                       //Model for bind the document information


        $scope.rows = [1, 2];     //Model for rows

        $scope.docs = {};           //Model for document object

        $scope.isErr = false;       //Model for validation
        $scope.isNull = true;       //Model for null validation
        $scope.docPattern = '';     //Model for store the pattern of ducument
        $scope.dep = [];            //Model for store the department list
        $scope.type = [
            {id: 1, type: 'PDF Document', ptrn: '.pdf'},
            {id: 2, type: 'Word Document', ptrn: '.docx'},
            {id: 3, type: 'Slide Document', ptrn: '.ppt'},
            {id: 4, type: 'Image Document', ptrn: 'image/*'},
            {id: 5, type: 'Archive Document', ptrn: '*.zip|*.rar'},
            {id: 6, type: 'Video Document', ptrn: '.mp4'}

        ];            //Model for type of the document

        dashboardService.checkAdmin();
        //Function for inceremeenting rows//

        $scope.addRow = function () {

            $scope.rows.push($scope.rows.length + 1);
        };

        //Function for removing rows//

        $scope.removeRow = function () {
            if ($scope.rows.length <= 2) return;
            $scope.rows.splice($scope.rows.length - 1, 1);
        };

        //Function for getting the pattern details//
        $scope.getPattern = function (ptrn) {
            if(ptrn==='' || ptrn===null || isNaN(ptrn)) return false;
            $scope.docPattern = $scope.type[ptrn - 1].ptrn;
        };

        //Function for submitting the form data
        $scope.saveDoc = function () {
            alert('Saved Successfully');
            document.forms.frmDoc.submit();
        };


        $scope.singleFileUpload = function () {
            uploadMultipleServices.singleFileUpload();
        };


        //Function for get the department
        $scope.getDepartment = function () {
            uploadMultipleServices.getDepartment()
                .then(function (response) {
                    $scope.dep = response.data;
                })
                .catch(function (err) {
                    console.log(err);
                });
        };
        
        //Dashboard
        $scope.goToDashboard = function () {

            uploadMultipleServices.goToDashboard();

        };
        //Initially calling the function
       $scope.getDepartment();

    }
})();