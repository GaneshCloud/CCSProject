
myApp.controller('viewDocumentController', function($scope,viewDocumentServices,starServices) {


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
  $scope.getParameterByName = function(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)', 'i'),
    results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  };

  //Function for getting the user info//

  $scope.getUser = function() {
          viewDocumentServices.getUser()
          .success(function(data) {
            console.log(data);
            if (data.mode == 'Admin') {
              $scope.isAdmin = true;
              $scope.css = 'starDisable.css';
            } else {
              $scope.isAdmin = false;
              $scope.css = 'star.css';
            }
          })
          .error(function() {

          });
        };

  //Function for getting the selected document info//

  $scope.getDocument = function() {

    viewDocumentServices.edit($scope.getParameterByName('id'))
              .success(function(data) {


                $scope.doc = data[0];
                var filename = $scope.doc.DOCFILE;
                $scope.thisFile = 'uploads/documents/' + data[0].ID + '.' + filename.split('.').pop();

                $scope.getStar($scope.getParameterByName('id'));
              })
              .error(function() {

              });

    if ($scope.getParameterByName('type') == 5)      {
      viewDocumentServices.getArchieve($scope.getParameterByName('id'))
                  .success(function(data) {
                    console.log(data);
                    //Alert(data);
                    $scope.files = data;
                  })
                  .error(function() {

                  });
    }


  };

  //Function for download the selected document//
  $scope.Download = function() {
    var id = $scope.getParameterByName('id');
    viewDocumentServices.Download({ID: +id})
              .success(function(data) {
                console.log(data);


              })
              .error(function() {

              });

  };


  //Function for getting department info//

  $scope.getDepartment = function() {
    viewDocumentServices.getDepartment()
            .success(function(data) {
              $scope.dep = data;


            })
            .error(function(err) {
              console.log(err);
            });
  };

  //Function for assign star rfating for a document//

  $scope.staring = function(stars) {

    alert('Thanks for your rating' + stars);
    starServices.setStar({DOC_ID: +$scope.getParameterByName('id'),STARS: +stars,STAR_DATE: new Date()})
            .success(function(data) {
              console.log(data);
            })
            .error(function(err) {
              console.log(err);
            });
  };

  //Function for getting the star rating of a document//

  $scope.getStar = function(id) {

    starServices.getStar('?DOC_ID=' + id)
            .success(function(data) {

              $scope.star = data[0].STR;

            })
            .error(function(err) {
              console.log(err);
            });

  };

  //Function for get the next document details//

  $scope.getNext = function(id) {

    if ($scope.doc.ID == 'undefined') return;
    viewDocumentServices.getNextDoc(id)
            .success(function(data) {
              if (data.length > 0)              {
                $scope.doc = data[0];
                $scope.getStar($scope.doc.ID);
                var filename = $scope.doc.DOCFILE;
                $scope.thisFile = 'uploads/documents/' + data[0].ID + '.' + filename.split('.').pop();


                if ($scope.doc.DOCTYPE == 5) {

                  viewDocumentServices.getArchieve($scope.doc.ID)
                  .success(function(data) {
                    console.log(data);
                    $scope.files = data;
                  })
                  .error(function() {

                  });
                }

              }

            })
            .error(function(err) {
              console.log(err);
            });

  };

  //Function for getting the previous document details//

  $scope.getPrevios = function(id) {

    if ($scope.doc.ID == 'undefined') return;
    viewDocumentServices.getPrevDoc(id)
            .success(function(data) {
              if (data.length > 0) {
                $scope.doc = data[0];
                $scope.getStar($scope.doc.ID);
                var filename = $scope.doc.DOCFILE;
                $scope.thisFile = 'uploads/documents/' + data[0].ID + '.' + filename.split('.').pop();

                if ($scope.doc.DOCTYPE == 5) {
                  viewDocumentServices.getArchieve($scope.doc.ID)
                  .success(function(data) {
                    console.log(data);
                    $scope.files = data;
                  })
                  .error(function() {

                  });
                }


              }
            })
            .error(function(err) {
              console.log(err);
            });

  };



  //Call the function for page loading//
  $scope.getUser();
  $scope.getDocument();
  $scope.getDepartment();


});









