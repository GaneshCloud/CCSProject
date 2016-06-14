(function() {
    angular
        .module('myApp')
        .controller('viewDocumentController', viewDocumentController);

    viewDocumentController.$inject=[
        '$scope',
        'viewDocumentServices',
        'starServices'
    ];
    function viewDocumentController($scope, viewDocumentServices, starServices) {


        $scope.doc = [];
        $scope.dep = [];                  //Model for department
        $scope.star = '';                 //Model for star rating
        $scope.isAdmin = true;            //Model for get the user
        $scope.css = 'star.css';   //Model for store the css
        $scope.next = [];                 //Model for store the next document info
        $scope.thisFile = '';             //Model for store the file location
        $scope.files = [];
        //$scope.isExist=true;


        //Function for getting the parameter from url//
        $scope.getParameterByName = function (name, url) {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, '\\$&');
            var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)', 'i'),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, ' '));
        };

        //Function for getting the user info//

        $scope.getUser = function () {
            viewDocumentServices.getUser()
                .then(function (response) {
                    if (response.data.mode === 'Admin') {
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

        $scope.getDocument = function () {

            viewDocumentServices.edit($scope.getParameterByName('id'))
                .then(function (response) {


                    $scope.doc = response.data[0];
                    var filename = $scope.doc.DOCFILE;
                    $scope.thisFile = 'uploads/documents/' + response.data[0].ID + '.' + filename.split('.').pop();
                    $scope.getStar($scope.getParameterByName('id'));
                })
                .catch(function () {

                });

            if ($scope.getParameterByName('type') === '5') {
                viewDocumentServices.getArchieve($scope.getParameterByName('id'))
                    .then(function (response) {
                        $scope.files = response.data;
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            }


        };

        //Function for download the selected document//
        $scope.Download = function () {
            var id = $scope.getParameterByName('id');
            viewDocumentServices.Download({ID: +id})
                .then(function (response) {
                    console.log(response.data);
                })
                .catch(function () {
                    console.log('error');
                });

        };


        //Function for getting department info//

        $scope.getDepartment = function () {
            viewDocumentServices.getDepartment()
                .then(function (response) {
                    $scope.dep =response.data;
                })
                .catch(function (err) {
                    console.log(err);
                });
        };

        //Function for assign star rfating for a document//

        $scope.staring = function (stars) {

            alert('Thanks for your rating' + stars);
            starServices.setStar({DOC_ID: +$scope.getParameterByName('id'), STARS: +stars, STAR_DATE: new Date()})
                .then(function (response) {
                    console.log(response.data);
                })
                .catch(function (err) {
                    console.log(err);
                });
        };

        //Function for getting the star rating of a document//

        $scope.getStar = function (id) {

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

            if ($scope.doc.ID === 'undefined') return;
            viewDocumentServices.getNextDoc(id)
                .then(function (response) {
                    if (response.data.length > 0) {
                        $scope.doc = response.data[0];
                        $scope.getStar($scope.doc.ID);
                        var filename = $scope.doc.DOCFILE;
                        $scope.thisFile = 'uploads/documents/' + response.data[0].ID + '.' + filename.split('.').pop();


                        if ($scope.doc.DOCTYPE === 5) {

                            viewDocumentServices.getArchieve($scope.doc.ID)
                                .then(function (response) {
                                    $scope.files = response.data;
                                })
                                .catch(function (err) {
                                    console.log(err);
                                });
                        }

                    }

                })
                .catch(function (err) {
                    console.log(err);
                });

        };

        //Function for getting the previous document details//

        $scope.getPrevios = function (id) {

            if ($scope.doc.ID === 'undefined') return;
            viewDocumentServices.getPrevDoc(id)
                .then(function (response) {
                    if (response.data.length > 0) {
                        $scope.doc = response.data[0];
                        $scope.getStar($scope.doc.ID);
                        var filename = $scope.doc.DOCFILE;
                        $scope.thisFile = 'uploads/documents/' + response.data[0].ID + '.' + filename.split('.').pop();

                        if ($scope.doc.DOCTYPE === 5) {
                            viewDocumentServices.getArchieve($scope.doc.ID)
                                .then(function (response) {
                                    $scope.files = response.data;
                                })
                                .catch(function (err) {
                                    console.log(err);
                                });
                        }


                    }
                })
                .catch(function (err) {
                    console.log(err);
                });

        };


        //Call the function for page loading//
        $scope.getUser();
        $scope.getDocument();
        $scope.getDepartment();
    }
})();









