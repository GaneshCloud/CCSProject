(function() {
    angular
        .module('myApp')
        .controller('singleFileUploadController', singleFileUploadController);

    singleFileUploadController.$inject=[
        '$scope',
        'uploadSingleServices',
        'dashboardService',
        '$window'
    ];
    function singleFileUploadController($scope, uploadSingleServices, dashboardService, $window) {

        //Document.getElementById("docCaption").focus();
        $scope.formData = {
            ID: '',
            DOCCAPTION: '',
            DOCTYPE: '',
            DOCDEP: '',
            DOCKEY: '',
            DOCDESC: '',
            DOCFILE: ''
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

            if(ptrn===null || ptrn=='' || isNaN(ptrn)) return false
            $scope.docPattern = $scope.type[ptrn - 1].ptrn;
        };

        //Function for save the document
        $scope.saveDoc = function () {
            alert('Saved Successfully');
            document.forms.frmDoc.submit();
        };

        //Function for liast the document api
        $scope.documentList = function () {
            uploadSingleServices.documentList();
        };

        $scope.multipleFileUpload = function () {
            uploadSingleServices.multipleFileUpload();
        };

        //Function for setting the data for editting
        $scope.editForm = function () {


            uploadSingleServices.edit($scope.getParameterByName('id'))
                .then(function (data) {

                    $scope.formData = data[0];
                    $scope.getPattern(data[0].DOCTYPE);
                })
                .catch(function (err) {
                    console.log(err);
                });

        };

        //Function for getting the parameter value by url
        $scope.getParameterByName = function (name, url) {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, '\\$&');
            var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)', 'i'),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, ' '));
        };


        //Function for get the department details
        $scope.getDepartment = function () {
            uploadSingleServices.getDepartment()
                .then(function (data) {
                    $scope.dep = data;
                })
                .catch(function (err) {
                    console.log(err);
                });
        };


        //Initially calling the functions for page loading
        $scope.getDepartment();


        if (window.location.pathname === '/documents/editDoc')
            $scope.editForm();

        // $scope.$on('fileSelected', function (event, args) {
        //     $scope.$apply(function () {
        //         $scope.files.push(args.file);
        //     });
        // });

        // Lodout
        // $scope.onLogout = function () {
        //
        //     if ($window.confirm('Are You Sure ! Do you need to Log Out?')) {
        //
        //         dashboardService.logout();
        //
        //     }
        //
        // };
        //Dashboard
        $scope.goToDashboard = function () {

            uploadSingleServices.goToDashboard();

        };


    }
})();

