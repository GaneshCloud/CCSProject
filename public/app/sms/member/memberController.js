/**
 * Created by Administrator on 05.07.2016.
 */

(function() {

    angular
        .module('myApp')
        .controller('memberController', memberController);

    memberController.$inject = [
        '$scope',
        'memberServices',
        'groupServices'
    ];

    function memberController($scope,memberServices,groupServices){

        $scope.isSave=true;
        $scope.newMember={
            grpId:'',
            memName:'',
            memMob:'',
            memId:''
        };
        $scope.grpList=[];
        $scope.memberList=[];
        $scope.curPage=1;                   //current pag no for pagination
        $scope.itemsPage=5;
        $scope.maxSize = 5;

        $scope.paginate = function (value) {
            var begin, end, index;
            begin = ($scope.curPage - 1) * $scope.itemsPage;
            end = begin + $scope.itemsPage;
            index = $scope.memberList.indexOf(value);
            return (begin <= index && index < end);
        };

        $scope.addMember=function(){

            if($scope.newMember.memName==='' || $scope.newMember.memMob ==='' || isNaN($scope.newMember)) {
                alert("invalid input");
                return;
            }
            memberServices.addMember($scope.newMember)
                .then(function(response){
                    listMember();
                    $scope.newMemberCreation();
                },function(err){
                    alert(err);
                });
        };

        $scope.editMemeber=function(id){

            alert($scope.memberList[id].memId);
                $scope.newMember.memName=$scope.memberList[id].memName;
                $scope.newMember.grpId=$scope.memberList[id].grpId;
                $scope.newMember.memId=$scope.memberList[id].memId;
                $scope.newMember.memMob=$scope.memberList[id].memMob;

                $scope.isSave=false;

        };

        $scope.deleteMember=function(id){
            memberServices.deleteMember($scope.memberList[id].memId)
                .then(function(response){
                    listMember();
                },function(err){
                    alert(err);
                });

        };

        $scope.newMemberCreation=function(){
            $scope.newMember.memName='';
            $scope.newMember.grpId='';
            $scope.newMember.memMob='';
            $scope.newMember.memId='';

            $scope.isSave=true;
        };




        function listMember(){
            memberServices.listMember()
                .then(function(response){
                    $scope.memberList=response.data;
                },function(err){
                    alert(err);
                });
        };

        function listGroup(){
            groupServices.listGroup()
                .then(function(response){
                    $scope.grpList=response.data;
                },function(err){
                    alert(err);
                });
        };




        listMember();
        listGroup();
    }

})();

