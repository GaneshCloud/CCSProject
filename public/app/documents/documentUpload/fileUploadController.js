(function() {
    angular
        .module('myApp')
        .controller('fileUploadController', fileUploadController);

    fileUploadController.$inject = [
        '$location',
        '$scope',
        'fileUploadServices',
        'dashboardService',
        'departmentServices',
        'documentTypeServices',
        '$window'


    ];
    function fileUploadController($location,$scope, fileUploadServices, dashboardService,departmentServices,documentTypeServices, $window) {

        $scope.formData = [{
            id: '',
            docCaption: '',
            docType: '',
            docDep: '',
            docKey: '',
            docDesc: '',
            docFile: ''
        }];                       //Model for bind the document information


        $scope.rows = [1, 2];     //Model for rows

        $scope.docs = {};           //Model for document object

        $scope.isErr = false;       //Model for validation
        $scope.isNull = true;       //Model for null validation
        $scope.docPattern = '';     //Model for store the pattern of ducument
        $scope.dep = [];            //Model for store the department list
        $scope.type = [];

        dashboardService.checkAdmin();
        //Function for inceremeenting rows//

        $scope.addRow = function () {

            $scope.rows.push($scope.rows.length + 1);
        };

        getDocumentType=function(){
            $scope.type=documentTypeServices.getDocumentType();
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


        // $scope.singleFileUpload = function () {
        //     uploadMultipleServices.singleFileUpload();
        // };


        //Function for get the department
        getDepartment = function () {
            departmentServices.getDepartment()
                .then(function (response) {
                    $scope.dep = response.data;
                })
                .catch(function (err) {
                    console.log(err);
                });
        };

        $scope.editForm = function () {
            fileUploadServices.getDocument(getParameterByName('id'))
                .then(function (response) {

                    $scope.formData = response.data[0];
                    $scope.getPattern(response.data[0].DOCTYPE);
                })
                .catch(function (err) {
                    console.log(err);
                });

        };


        //Dashboard
        $scope.goToDashboard = function () {

            fileUploadServices.goToDashboard();

        };

        getParameterByName = function (params) {
            if ( $location.search().hasOwnProperty( params ) ) {
                return $location.search()[params];
            }
        };

        //Initially calling the function
        if ($location.path() === '/documents/editDoc'){

            $scope.editForm();
            $scope.getPattern($scope.formData.docType);
        }


        getDocumentType();
        getDepartment();


    }
})();