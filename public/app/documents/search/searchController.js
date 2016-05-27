
'use strict';
myApp.controller('searchController', function($scope,documentSearchServices,iconServices,userDashboardService) {
        
        $scope.searchkey = {};              //model for search key object
        $scope.searchkey.docType=-1;        //docType property of search key object
        $scope.searchkey.dep=-1;            //department property of search key object
        $scope.searchres = [];              //array for store the search result
        $scope.search="";                   //model for searck key
        $scope.curPage=1;                   //current page number
        $scope.itemsPage=6;                 //no of items per page
        $scope.filteredRes =[];             //filtered result for pagination
        $scope.maxSize = 5;                 //maximum size of the pages to be show
        $scope.noData=false;                //model for check the search result is 0 or > 0 
        $scope.dep=[];                      //model for department
        $scope.loadimage="";                //model for loading image
        $scope.stLst=false;                 //model for view mode settings
        $scope.field ="DOCCAPTION";         //model for ordering field of data
        $scope.isReverse=false;             //model for check asc/ desc
        $scope.srcViews="app/documents/search/searchTileView.html";//model for store the path of the html template

        userDashboardService.checkUser();

        //function for get the css class
        $scope.getClass = function (id) {

             return ($scope.searchkey.docType==id?'active' : '');
        };


     
        //function for changing the view of the result
        $scope.changeView=function(){
           
            if($scope.stLst===true)
            {
                
                 $scope.stLst=false;
                 $scope.srcViews="app/documents/search/searchTileView.html";
            }
            else
            {
                 $scope.stLst=true;
                 $scope.srcViews="app/documents/search/searchListView.html";
            }
        };

        
        //function for getting the icon information from iconServices
        $scope.getIcon = function (id) {

            return iconServices.getIcon(id);
        };


        //function for department Details
        $scope.getDepartment=function(){
            documentSearchServices.getDepartment()
            .success(function(data){
                $scope.dep=data;
                $scope.dep.splice(0, 0,
                {DEP_ID: "-1", DEP_NAME: "All Department"}
                );

            })
            .error(function(err){
              console.log(err);
            });
        };


        //function for search the document
        $scope.searchData = function(page) {
                console.log(page);
               
                documentSearchServices.search("?docType="+$scope.searchkey.docType+"&dep="+$scope.searchkey.dep+"&page="+$scope.page+"&serStr="+$scope.search)
                 
                .success(function(data) {
                    
                    $scope.searchres = data;
                    console.log(data);
                    if(data.length <= 0) 
                        $scope.noData=true;
                    else
                        $scope.noData=false;
                 
                $scope.$watch("curPage + itemspage", function() {

                        var begin = (($scope.curPage - 1) * $scope.itemsPage),end = begin + $scope.itemsPage;
                        console.log(begin + " "+end);
                        $scope.filteredRes = $scope.searchres.slice(begin, end);
                       
                    });
                });
        };


        //function for change the document searching criteria
        $scope.changeDocument = function(id) {
             $scope.searchkey.docType=id;
        };


        //function for ordering the document
        $scope.orderMe=function(f){
            
             if ($scope.field == f){
               $scope.isReverse = !$scope.isReverse;
            return;
            }

                $scope.field = f;
                $scope.isReverse = false;

        };

        
       //initially calls the function 
       $scope.searchData();
       $scope.getDepartment();
       

        });


 
   


 

  


