
'use strict';
myApp.controller('multipleFileUploadController', function($scope,uploadMultipleServices,adminDashboardService,$window) {

      
        $scope.formData = [{
          ID:"",
          DOC_CAPTION:"",
          DOC_TYPE:"",
          DOC_DEP:"",
          DOC_KEY:"",
          DOC_DESC:"",
          DOC_FILE:""
        }];                       //model for bind the document information

        
        $scope.rows = [1, 2];     //model for rows

        $scope.docs={};           //model for document object
        
        $scope.isErr=false;       //model for validation
        $scope.isNull=true;       //model for null validation
        $scope.docPattern='';     //model for store the pattern of ducument
        $scope.dep=[];            //model for store the department list
        $scope.type=[
                     {id:1,type:'PDF Document',ptrn:".pdf"},
                     {id:2,type:'Word Document',ptrn:".docx"},
                     {id:3,type:'Slide Document',ptrn:".ppt"},
                     {id:4,type:'Image Document',ptrn:"image/*"},
                     {id:5,type:'Archive Document',ptrn:"*.zip|*.rar"},
                     {id:6,type:'Video Document',ptrn:".mp4"}

                    ];            //model for type of the document

        adminDashboardService.checkAdmin();
       //function for inceremeenting rows//

       $scope.addRow=function(){

          $scope.rows.push($scope.rows.length+1);
       };

       //function for removing rows//

       $scope.removeRow=function(){
          if($scope.rows.length <=2) return;
          $scope.rows.splice($scope.rows.length-1,1);
       };
        
       //function for getting the pattern details// 
       $scope.getPattern=function(ptrn){
           $scope.docPattern=$scope.type[ptrn-1].ptrn;  
       };

       //function for submitting the form data
       $scope.saveDoc = function() {
                    alert("Saved Successfully");
                    document.forms.frmDoc.submit();
        };


        $scope.singleFileUpload=function(){
            uploadMultipleServices.singleFileUpload().then(function(){

            });
        };

        //function for getting the url parameter value//

        $scope.getParameterByName=function (name, url) {
        if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i"),
            results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        };
         

        //function for get the department 
        $scope.getDepartment=function(){
            uploadMultipleServices.getDepartment()
            .success(function(data){
                $scope.dep=data;
            })
            .error(function(err){
              console.log(err);
            });
        };

        // logout
        $scope.onLogout = function(){

        if ($window.confirm("Are You Sure ! Do you need to Log Out?")) {

            uploadMultipleServices.logout();

        }

        };
        //Dashboard
        $scope.goToDashboard = function(){

            uploadMultipleServices.goToDashboard();

        };
        //initially calling the function
        $scope.getDepartment();
      
    });
      

