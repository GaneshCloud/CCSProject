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
        '$window'
    ];

    function documentListController($scope,documentListServices,starServices,iconServices,dashboardService,$window) {
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
        $scope.field='DOCCAPTION';          //model for ordering field
        $scope.maxSize = 5;                 //maximum size of the page no to be show
        $scope.rateInfo=[];                 //model store the rating info
        $scope.popup='';                    //for popup window
        $scope.dep='';                      //for department
        $scope.type=[
            {
                id:-1,
                type:'All Document',
                ptrn:""
            },
            {
                id:1,
                type:'PDF Document',
                ptrn:".pdf"
            },
            {
                id:2,
                type:'Word Document',
                ptrn:".docx"
            },
            {
                id:3,
                type:'Slide Document',
                ptrn:".ppt"
            },
            {
                id:4,
                type:'Image Document',
                ptrn:"image/*"
            },
            {
                id:5,
                type:'Archive Document',
                ptrn:"*.zip|*.rar"
            },
            {
                id:6,
                type:'Video Document',
                ptrn:".mp4"
            }

        ];//array for store document type

        dashboardService.checkAdmin();

        //  order function based on a order field//
        $scope.orderMe=function(f){

            if(f===null || f==='') $scope.isReverse=$scope.isReverse;
            if ($scope.field === f){
                $scope.isReverse = !$scope.isReverse;
                return;
            }
            $scope.field = f;
            $scope.isReverse = false;

        };

        //function for getting ratingInformation of each documents//
        $scope.getRateInfo=function(id){

            if(id==='' || id===null || isNaN(id)) return false;
            starServices.getStarInfo(id)
                .then(function(data){
                    $scope.rateInfo=data;
                    console.log(data);
                    $scope.popup={'visibility': 'visible','opacity': 1};

                    console.log($scope.rateInfo);
                }).catch(function(){

            });

        };

        $scope.newDocument=function(){
            documentListServices.newDocument();
        };


        //function for getting data from database//
        // $scope.getData = function() {
        //
        //     documentListServices.get()
        //
        //         .success(function(data) {
        //
        //             $scope.docs = data;
        //
        //             $scope.$watch("cur_page + items_page", function() {
        //
        //                 var begin = (($scope.curPage - 1) * $scope.itemsPage), end = begin + $scope.itemsPage;
        //
        //                 $scope.filteredDoc = $scope.docs.slice(begin, end);
        //
        //             });
        //
        //         });
        // };


//function for getting department details//
        $scope.getDepartment=function(){
            documentListServices.getDepartment()
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

        //function for searching documents//
        $scope.searchData = function() {

            documentListServices.search("?docType="+$scope.searchkey.docType+"&dep="+$scope.searchkey.dep+"&page="+$scope.page+"&serStr="+$scope.search)
                .then(function(response) {

                    $scope.searchres = response.data;
                    if(response.data.length <= 0)
                        $scope.noData=true;
                    else
                        $scope.noData=false;

                    $scope.$watch("curPage + itemsPage", function() {

                        var begin = (($scope.curPage - 1) * $scope.itemsPage), end = begin + $scope.itemsPage;

                        $scope.filteredRes = $scope.searchres.slice(begin, end);
                    });
                })
                .catch(function(){

                });


        };


        $scope.getIcon = function (id) {
            if(id==='' ||  id===null || isNaN(id)) return false;
            return iconServices.getIcon(id);
        };

        $scope.editDoc=function(id) {
            $scope.selId=$scope.docs[id].ID;
            documentListServices.edit()
                .then(function(data) {
                    console.log(data);
                })
                .catch(function(){

                });
        };

        //function for delete a document//
        $scope.deleteDoc = function(id) {
            $scope.selId=id;
            documentListServices.delete({ID:+$scope.selId})
                .then(function(data) {
                    console.log(data);
                    console.log("deleted");
                    $scope.searchData();

                })
                .catch(function(){

                    $scope.searchData();
                });



        };

        // logout
        // $scope.onLogout = function(){
        //
        //     if ($window.confirm("Are You Sure ! Do you need to Log Out?")) {
        //
        //         dashboardService.logout();
        //
        //     }
        //
        // };
        //Dashboard
        $scope.goToDashboard = function(){

            documentListServices.goToDashboard();

        };

        // call the functions when the page is loading//
        $scope.getDepartment();
        $scope.searchData();

    }
})(); 