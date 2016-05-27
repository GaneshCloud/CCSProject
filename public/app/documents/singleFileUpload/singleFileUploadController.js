
'use strict';
myApp.controller('singleFileUploadController', function($scope,uploadSingleServices,adminDashboardService) {
  
        //document.getElementById("docCaption").focus();
        $scope.formData = {
          ID:"",
          DOCCAPTION:"",
          DOCTYPE:"",
          DOCDEP:"",
          DOCKEY:"",
          DOCDESC:"",
          DOCFILE:""
        };                      //model object for store the document input data

        $scope.docs={};         
        $scope.isErr=false;     //model for checking error
        $scope.isNull=true;     //mode for checks the null value;
        $scope.docPattern='';   //model for pattern
        $scope.search={};       
        $scope.dep=[];          //model for store the department details
        $scope.type=[
                     {id:1,type:'PDF Document',ptrn:".pdf"},
                     {id:2,type:'Word Document',ptrn:".docx"},
                     {id:3,type:'Slide Document',ptrn:".ppt"},
                     {id:4,type:'Image Document',ptrn:"image/*"},
                     {id:5,type:'Archive Document',ptrn:"*.zip|*.rar"},
                     {id:6,type:'Video Document',ptrn:".mp4"}

                    ];          //model for document type
        adminDashboardService.checkAdmin();
       //function for get the pattern details 
       $scope.getPattern=function(ptrn){ 
           $scope.docPattern=$scope.type[ptrn-1].ptrn; 
       };

       //function for save the document
       $scope.saveDoc = function() {
                    alert('Saved Successfully');
                    document.forms.frmDoc.submit();      
        };

        //function for liast the document api
        $scope.documentList = function() {
            uploadSingleServices.documentList();
        };

        $scope.multipleFileUpload=function(){
            uploadSingleServices.multipleFileUpload();
        };

        //function for setting the data for editting
        $scope.editForm = function() {

            
                
                uploadSingleServices.edit($scope.getParameterByName("id"))
                    .success(function(data) {

                       $scope.formData = data[0];
                       $scope.getPattern(data[0].DOCTYPE);
                    })
                    .error(function(err){
                       console.log(err);
                    });
               
        };

        //function for getting the parameter value by url
        $scope.getParameterByName=function (name, url) {
          if (!url) url = window.location.href;
              name = name.replace(/[\[\]]/g, "\\$&");
              var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i"),
              results = regex.exec(url);
              if (!results) return null;
              if (!results[2]) return '';
              return decodeURIComponent(results[2].replace(/\+/g, " "));
        };
         

        //function for get the department details
        $scope.getDepartment=function(){
            uploadSingleServices.getDepartment()
            .success(function(data){
                $scope.dep=data;
            })
            .error(function(err){
              console.log(err);
            });
        };
       


        //initially calling the functions for page loading
        $scope.getDepartment();
        
       
        if(window.location.pathname=="/documents/editDoc")
            $scope.editForm();

        $scope.$on("fileSelected", function (event, args) {
            $scope.$apply(function () {            
             $scope.files.push(args.file);
          });
        });


    });
      
 