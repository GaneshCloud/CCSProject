/**
 * Created by Administrator on 05.07.2016.
 */

(function(){
    angular
        .module('myApp')
        .controller('fbMessageReportController', fbMessageReportController);

    fbMessageReportController.$inject = [
        '$scope',
        'fbMessageReportServices'
    ];

    function fbMessageReportController($scope,fbMessageReportServices){

        $scope.fbMsgLst=[];                              //model for sms list
        $scope.searchText='';
        $scope.popup={'visibility': 'hide','opacity': 0};
        $scope.fbMsgDetails={};
        $scope.curPage=1;                   //current pag no for pagination
        $scope.itemsPage=10;
        $scope.maxSize = 5;

        function fbMsgLst(){
            fbMessageReportServices.fbMsgLst()
                .then(function(response){
                    $scope.fbMsgLst=response.data;
                },function(err){
                    alert(err.message);
                });
        }

        // $scope.searchByDay=function(){
        //     alert($scope.daySelected);
        // };

        $scope.paginate = function (value) {
            var begin, end, index;
            begin = ($scope.curPage - 1) * $scope.itemsPage;
            end = begin + $scope.itemsPage;
            index = $scope.fbMsgLst.indexOf(value);
            return (begin <= index && index < end);
        };

        // $scope.getSmsDataById=function(id){
        //     if(id=='' || id==null || isNaN(id)) return false;
        //     deliveryServices.getSmsDataById($scope.smsList[id].id)
        //         .then(function(response){
        //             $scope.smsDetails=response.data;
        //             $scope.popup={'visibility': 'visible','opacity': 1};
        //         },function(err){
        //             alert(err);
        //         })
        //
        // };

        fbMsgLst();


    }
})();
