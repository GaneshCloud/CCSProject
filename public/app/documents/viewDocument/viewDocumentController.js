(function() {
    angular
        .module('myApp')
        .controller('viewDocumentController', viewDocumentController);

    viewDocumentController.$inject=[

        '$location',
        '$scope',
        'viewDocumentServices',
        'departmentServices',
        'starServices',
        'UPLOAD_DOC_PATH'
    ];
    function viewDocumentController($location,$scope, viewDocumentServices,departmentServices, starServices,UPLOAD_DOC_PATH) {


        $scope.doc = [];
        $scope.dep = [];                  //Model for department
        $scope.star = '';                 //Model for star rating
        $scope.isAdmin = true;            //Model for get the user
        $scope.css = 'star.css';   //Model for store the css
        $scope.next = [];                 //Model for store the next document info
        $scope.thisFile = '';             //Model for store the file location
        $scope.files = [];
        $scope.isExist=false;                     //check for document is exist/not
        $scope.isFileExist=false;
        //$scope.isExist=true;


        // //Function for getting the parameter from url//
        getParameterByName = function (params) {
            if ( $location.search().hasOwnProperty( params ) ) {
                return $location.search()[params];
            }
        };

        //Function for getting the user info//

        getUser = function () {
            viewDocumentServices.getUser()
                .then(function (response) {
                    if (response.data.mode === 'admin') {
                        $scope.isAdmin = true;
                        $scope.css = 'starDisable.css';
                    } else {
                        $scope.isAdmin = false;
                        $scope.css = 'star.css';
                    }
                })
                .catch(function () {

                });
        };

        //Function for getting the selected document info//

        getDocument = function () {

            viewDocumentServices.getDocument(getParameterByName('id'))
                .then(loadDocument)
                .catch(function () {

                });
            

        };

        //Function for download the selected document//
        $scope.download = function () {
            var id = getParameterByName('id');
            viewDocumentServices.download({ID: +id})
                .then(function (response) {
                    console.log(response.data);
                })
                .catch(function () {
                    console.log('error');
                });

        };


        //Function for getting department info//

        getDepartment = function () {
            departmentServices.getDepartment()
                .then(function (response) {
                    $scope.dep =response.data;
                })
                .catch(function (err) {
                    console.log(err);
                });
        };

        //Function for assign star rfating for a document//

        $scope.staring = function (stars) {


            starServices.setStar({DOC_ID: +getParameterByName('id'), STARS: +stars, STAR_DATE: new Date()})
                .then(function (response) {
                    alert('Thanks for your rating :' + stars);
                })
                .catch(function (err) {
                    console.log(err);
                    alert('Some error occured');
                });
        };

        //Function for getting the star rating of a document//

        getStar = function (id) {

            starServices.getStar('?DOC_ID=' + id)
                .then(function (response) {
                    $scope.star = response.data[0].STR;

                })
                .catch(function (err) {
                    console.log(err);
                });

        };
        //Function for get the next document details//

        $scope.getNext = function (id) {
            if( $scope.doc.length <=0) return;
            if ($scope.doc.id === 'undefined') return;
            viewDocumentServices.getNextDoc(id)
                .then(loadDocument)
                .catch(function (err) {
                    console.log(err);
                });

        };

        //Function for getting the previous document details//

        $scope.getPrevios = function (id) {
            if( $scope.doc.length <=0) return;
            if ($scope.doc.id === 'undefined') return;
            viewDocumentServices.getPrevDoc(id)
                .then(loadDocument)
                .catch(function (err) {
                    console.log(err);
                });

        };

        loadDocument=function (response) {
            if(response.data==='invalid') {$scope.isExist=false; return};

            if (response.data.length > 0) {
                $scope.isExist=true;
                $scope.doc = response.data[0];
                getStar($scope.doc.id);
                var filename = $scope.doc.docFile;
                $scope.thisFile = UPLOAD_DOC_PATH + $scope.doc.id + '.' + filename.split('.').pop();

            if ($scope.doc.docType === 5) {
                viewDocumentServices.getArchieve($scope.doc.id)
                    .then(function (response) {
                        $scope.files = response.data;
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            }


            }
            else
                return;
        };

        //Call the function for page loading//
        getUser();
        getDocument();
        getDepartment();
    }
})();









