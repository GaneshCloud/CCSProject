/**
 * Created by Administrator on 05.07.2016.
 */

(function() {

    angular
        .module('myApp')
        .controller('groupController', groupController);

    groupController.$inject = [
        '$scope',
        'groupServices'
    ];

    function groupController($scope,groupServices){
        $scope.newGroup={
            grpId:'',
            grpName:''
        };

        $scope.isSave=true;
        $scope.newMember={
            grpId:'',
            memName:'',
            memWhatsAppId:''
        };
        $scope.grpList=[];
        $scope.memberList=[];
        $scope.selctedGroup=null;
        $scope.curPage=1;                   //current pag no for pagination
        $scope.itemsPage=5;
        $scope.maxSize = 5;

        $scope.addGroup=function(){
            groupServices.addGroup($scope.newGroup)
                .then(function(response){
                    listGroup();
                    $scope.newGroupCreation();

                },function(err){
                    alert(err);
                });
        };

        $scope.paginate = function (value) {
            var begin, end, index;
            begin = ($scope.curPage - 1) * $scope.itemsPage;
            end = begin + $scope.itemsPage;
            index = $scope.grpList.indexOf(value);
            return (begin <= index && index < end);
        };

        $scope.editGroup=function(id){
                $scope.newGroup.grpName=$scope.grpList[id].grpName;
                $scope.newGroup.grpId=$scope.grpList[id].grpId;
                $scope.isSave=false;
        };

        $scope.deleteGroup=function(id){
            groupServices.deleteGroup($scope.grpList[id].grpId)
                .then(function(response){
                    listGroup();
                },function(err){
                    alert(err);
                });

        };

        $scope.newGroupCreation=function(){
            $scope.newGroup.grpName='';
            $scope.newGroup.grpId='';
            $scope.isSave=true;
        };

        $scope.getMemberByGrpId=function(id){
            $scope.selctedGroup=id;
            groupServices.getMemberByGrpId($scope.grpList[id].grpId)
                .then(function(response){
                    $scope.memberList=response.data;
                    console.log($scope.memberList);
                    $scope.popup={'visibility': 'visible','opacity': 1};
                },function(err){
                    alert(err);
                });
        };

        $scope.removeFromGroup=function(id){
          groupServices.removeFromGroup($scope.memberList[id].mapperId)
              .then(function(response){
                  $scope.getMemberByGrpId($scope.selctedGroup);
              },function(err){
                  alert(err);
              })
        };



        function listGroup(){
            groupServices.listGroup()
                .then(function(response){
                    $scope.grpList=response.data;
                },function(err){
                    alert(err);
                });
        };

        listGroup();
    }

})();

