(function(){
    angular
        .module('myApp')
        .controller('documentListController', documentListController);

    documentListController.$inject = [
        '$scope',
        'documentListServices',
        'starServices',
        'iconServices',
        'dashboardService',
        'departmentServices',
        'documentTypeServices',
        '$window',
        '$filter'
    ];

    function documentListController($scope,documentListServices,starServices,iconServices,dashboardService,departmentServices,documentTypeServices,$window,$filter) {
        $scope.formData = [];               //model for storing the inputting data
        $scope.filteredRes=[];              //model for store filtered result
        $scope.searchres=[];                //model for store the search result
        $scope.docs={};                     //model for store the data from database
        $scope.search="";                   //model for search key
        $scope.searchkey = {};              //searchkey model object
        $scope.searchkey.dep=-1;            //searchkey department model initially -1
        $scope.curPage=1;                   //current pag no for pagination
        $scope.itemsPage=5;                 //items per page
        $scope.searchkey.docType=-1;        //search key doctype
        $scope.isReverse=false;             //model for ascending and descending
        $scope.filteredDoc =[];
        $scope.field='docCaption';          //model for ordering field
        $scope.maxSize = 5;                 //maximum size of the page no to be show
        $scope.rateInfo=[];                 //model store the rating info
        $scope.popup='';                    //for popup window
        $scope.dep='';                      //for department
        $scope.type=[];//array for store document type

        dashboardService.checkAdmin();

        //  order function based on a order field//
        $scope.orderMe=function(f){

            if(f===null || f==='') $scope.isReverse=$scope.isReverse;
            if ($scope.field === f){
                $scope.isReverse = !$scope.isReverse;
                // return;
            }
            else{
                $scope.field = f;
                $scope.isReverse = false;
            }

             $scope.searchres = $filter('orderBy')($scope.searchres, f, $scope.isReverse);

        };

        //function for getting ratingInformation of each documents//
        $scope.getRateInfo=function(id){

            if(id==='' || id===null || isNaN(id)) return false;
            starServices.getStarInfo(id)
                .then(function(response){
                    $scope.rateInfo=response.data;
                    $scope.popup={'visibility': 'visible','opacity': 1};
                }).catch(function(){

            });

        };
        
        getDocumentType=function(){
            $scope.type=documentTypeServices.getDocumentType();
        };

//function for getting department details//
        getDepartment=function(){
            departmentServices.getDepartment()
                .then(function(response){
                    $scope.dep=response.data;
                    $scope.dep.splice(0, 0,
                        {DEP_ID: "-1", DEP_NAME: "All Department"}
                    );
                })
                .catch(function(err){
                    console.log(err);
                });
        };

        $scope.paginate = function (value) {
            var begin, end, index;
            begin = ($scope.curPage - 1) * $scope.itemsPage;
            end = begin + $scope.itemsPage;
            index = $scope.searchres.indexOf(value);
            return (begin <= index && index < end);
        };
        
        //function for searching documents//
        $scope.searchData = function() {

            documentListServices.search("?docType="+$scope.searchkey.docType+"&dep="+$scope.searchkey.dep+"&page="+$scope.page+"&serStr="+$scope.search)
                .then(function(response) {

                    $scope.searchres = response.data;
                    if(response.data.length <= 0)
                        $scope.noData=true;
                    else
                        $scope.noData=false;

                    // $scope.$watch("curPage + itemsPage + searchres", function() {
                    //
                    //     var begin = (($scope.curPage - 1) * $scope.itemsPage), end = begin + $scope.itemsPage;
                    //
                    //     $scope.filteredRes = $scope.searchres.slice(begin, end);
                    // });
                })
                .catch(function(){

                });


        };


        $scope.getIcon = function (id) {
            if(id==='' ||  id===null || isNaN(id)) return false;
            return iconServices.getIcon(id);
        };
        

        //function for delete a document//
        $scope.deleteDoc = function(id) {
            $scope.selId=id;
            documentListServices.delete({ID:+$scope.selId})
                .then(function(response) {
                    console.log("deleted");
                    $scope.searchData();

                })
                .catch(function(){
                    $scope.searchData();
                });



        };
        
        $scope.goToDashboard = function(){

            documentListServices.goToDashboard();

        };

        // call the functions when the page is loading//
        getDepartment();
        getDocumentType();
        $scope.searchData();

    }
})(); 