(function() {
    angular
        .module('myApp')
        .controller('singleFileUploadController', singleFileUploadController);

    singleFileUploadController.$inject=[
        '$location',
        '$scope',
        'uploadSingleServices',
        'dashboardService',
        '$window'
    ];
    function singleFileUploadController($location,$scope, uploadSingleServices, dashboardService, $window) {

        //Document.getElementById("docCaption").focus();
        $scope.formData = {
            id: '',
            docCaption: '',
            docType: '',
            docDep: '',
            docKey: '',
            docDesc: '',
            docFile: ''
        };                      //Model object for store the document input data

        $scope.docs = {};
        $scope.isErr = false;     //Model for checking error
        $scope.isNull = true;     //Mode for checks the null value;
        $scope.docPattern = '';   //Model for pattern
        $scope.search = {};
        $scope.dep = [];          //Model for store the department details
        $scope.type = [
            {id: 1, type: 'PDF Document', ptrn: '.pdf'},
            {id: 2, type: 'Word Document', ptrn: '.docx'},
            {id: 3, type: 'Slide Document', ptrn: '.ppt'},
            {id: 4, type: 'Image Document', ptrn: 'image/*'},
            {id: 5, type: 'Archive Document', ptrn: '*.zip|*.rar'},
            {id: 6, type: 'Video Document', ptrn: '.mp4'}

        ];          //Model for document type
        dashboardService.checkAdmin();

        //Function for get the pattern details
        $scope.getPattern = function (ptrn) {
            if(ptrn===null || ptrn==='' || isNaN(ptrn)) return false;
            $scope.docPattern = $scope.type[ptrn - 1].ptrn;
        };

        //Function for save the document
        $scope.saveDoc = function () {
            alert('Saved Successfully');
            document.forms.frmDoc.submit();
        };

        //Function for liast the document api
        // $scope.documentList = function () {
        //     uploadSingleServices.documentList();
        // };
        //
        // $scope.multipleFileUpload = function () {
        //     uploadSingleServices.multipleFileUpload();
        // };

        //Function for setting the data for editting
        $scope.editForm = function () {

            uploadSingleServices.getDocument(getParameterByName('id'))
                .then(function (response) {

                    $scope.formData = response.data[0];
                    $scope.getPattern(response.data[0].DOCTYPE);
                })
                .catch(function (err) {
                    console.log(err);
                });

        };

        //Function for getting the parameter value by url
        getParameterByName = function (params) {
            if ( $location.search().hasOwnProperty( params ) ) {
                return $location.search()[params];
            }
        };


        //Function for get the department details
        getDepartment = function () {
            uploadSingleServices.getDepartment()
                .then(function (response) {
                    $scope.dep = response.data;
                })
                .catch(function (err) {
                    console.log(err);
                });
        };


        //Initially calling the functions for page loading
        getDepartment();


        if (window.location.pathname === '/documents/editDoc')
            $scope.editForm();
        
        //Dashboard
        $scope.goToDashboard = function () {

            uploadSingleServices.goToDashboard();

        };


    }
})();

