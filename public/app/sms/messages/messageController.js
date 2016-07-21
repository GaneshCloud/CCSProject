/**
 * Created by Administrator on 05.07.2016.
 */

(function(){
    angular
        .module('myApp')
        .controller('messageController', messageController);

    messageController.$inject = [
        '$scope',
        'messageServices',
        'groupServices',
        '$filter'
    ];

    function messageController($scope,messageServices,groupServices,$filter){
        //$scope.selectedContacts=[];                                                        //selected contact list
        $scope.contacts=[
            {name:"name1",mob:"9100821578"},
            {name:"name2",mob:"8025821578"},
            {name:"name3",mob:"912821578"}];                                               //contact List
        $scope.newSms= {
            smsText:'',
            selectedContacts:[],
            selectGroup:[]
        };

        $scope.numSms=1;
        $scope.contactString='';
        $scope.grpList=[];
        $scope.selectedGrp=null;
        $scope.selProject=null;
        $scope.selStud=null;
        $scope.selDep=null;
        $scope.contInfo=[
            {id:1,name:'Ramshif',mob:123456789,prId:1001},
            {id:2,name:'Rakesh',mob:9020521784 ,prId:1002},
            {id:3,name:'Midhun',mob:1472583652,prId:1001},
            {id:4,name:'Ilyas',mob:10214205478,prId:1001}
        ];

        $scope.prDepartment=[
            {depCode:101,prDep:'Computer Science'},
            {depCode:102,prDep:'Electronics'}

        ];
        $scope.prInfo=[
            {prId:1001,prCaption:'Cloud Project',prDep:$scope.prDepartment[0].depCode},
            {prId:1002,prCaption:'Java Project',prDep:$scope.prDepartment[0].depCode},
            {prId:1003,prCaption:'Embedded Project',prDep:$scope.prDepartment[1].depCode}

        ];


        var str='';


        $scope.getContactsBySelection=function(id){
            if($scope.selStud===null) return;
            $scope.newSms.selectedContacts.push($scope.selStud);
        };

        $scope.clearAllContacts=function(){
            $scope.newSms.selectedContacts=[];
        };


        $scope.getAllContacts=function(){
            $scope.newSms.selectedContacts=[];
            $scope.newSms.selectedContacts=$scope.contInfo.slice();
        };

        $scope.getContactsByPrId=function(){

            $scope.newSms.selectedContacts = $filter("filter")($scope.contInfo,{prId:$scope.selProject});
        };

        $scope.getContactsByPrDep=function(){

            $scope.newSms.selectedContacts=[];
            if($scope.selDep===null) return;
            var selProjects=$filter("filter")($scope.prInfo,{prDep:$scope.selDep.depCode});

            for(var i=0;i<selProjects.length;i++){

                var obj=$filter("filter")($scope.contInfo,{prId:selProjects[i].prId});
                for(var j=0;j<obj.length;j++){
                    var data=[];
                    $scope.newSms.selectedContacts.push(obj[j]);
                }

            }
            
        };

        $scope.removeContact=function(id){
            $scope.newSms.selectedContacts.splice(id,1);
            str='';
        };

        $scope.removeGroup=function(id){
            $scope.newSms.selectGroup.splice(id,1);
        };

        $scope.removeImage=function(id){
            $scope.imgFiles.splice(id,1);
        };

        $scope.calculateCharacter=function(){
            $scope.numSms=Math.ceil($scope.newSms.smsText.length/160);                         //considering 160 character in one message
        };

        $scope.sendSms=function(){

            if($scope.newSms.selectGroup.length <=0 && $scope.newSms.selectedContacts.length <=0){
                alert("please select a valid contacts");
                return;
            }

            messageServices.sendSms($scope.newSms)
                .then(function(response){
                        alert(response.data);

                },function(err){
                        alert(err)
                });
            newSms();
        };

        function getContactList(){
            messageServices.getContactList()
                .then(function(response){

                },function(err){

                })
        };

        function newSms(){
            $scope.newSms= {
                smsText:'',
                selectedContacts:[],
                selectGroup:[]
            };
        }

        function splitString() {

            $scope.newSms.selectedContacts=[];
            // str=str+$scope.contactString;
            var arrayString = str.split(',');
            for(i=0;i<arrayString.length;i++){
                $scope.newSms.selectedContacts.push(arrayString[i]);
                console.log(arrayString[i]);
            }

        }

        $scope.$watch("contactString",function(oldVal,newVal){
            if($scope.contactString[$scope.contactString.length-1]===','){
                if(isNaN($scope.contactString.substr(0,$scope.contactString.length-2)) || $scope.contactString.length <=7 || $scope.contactString.length >=12){
                    alert("inavlid");
                    return;
                }
                str=str+$scope.contactString;
                $scope.contactString='';
                splitString();
            }

        });

        $scope.selectGroup=function(){
                $scope.newSms.selectGroup.push({"grpId":$scope.selectedGrp.grpId,"grpName":$scope.selectedGrp.grpName});

        };

        function listGroup(){
            groupServices.listGroup()
                .then(function(response){
                    $scope.grpList=response.data;
                },function(err){
                    alert(err);
                });
        };

        if(document.getElementById("contactId")!==null)
        {
            document.getElementById("contactId").addEventListener("keydown", KeyCheck);  //or however you are calling your method
            function KeyCheck(event)
            {
                var KeyID = event.keyCode;
                if(KeyID===8)
                {
                    if($scope.contactString.length<=0 && $scope.newSms.selectedContacts.length >0){
                        str='';
                        $scope.newSms.selectedContacts.splice($scope.newSms.selectedContacts.length-1,1);
                        $scope.contactString=$scope.newSms.selectedContacts[$scope.newSms.selectedContacts.length-1];
                        $scope.$digest();
                    }

                }
            }
        }


        listGroup();
        getContactList();
    }
})();
