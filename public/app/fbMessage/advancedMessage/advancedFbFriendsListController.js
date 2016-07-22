/**
 * Created by Administrator on 05.07.2016.
 */
/**
 * Created by Administrator on 05.07.2016.
 */
(function(){
    angular
        .module("myApp")
        .controller("advancedFbFriendsListController",advancedFbFriendsListController)

    advancedFbFriendsListController.$inject=[
        '$scope',
        'advancedFbFriendsListServices',
        '$filter',
        'departmentServices'
    ];

    function advancedFbFriendsListController($scope,advancedFbFriendsListServices,$filter,departmentServices){

        $scope.friendList=[];
        $scope.contInfo=[
            {id:1,name:'Ramshif',mob:123456789,prId:1001,fbId:'100002196848042'},
            {id:2,name:'Rakesh',mob:9020521784 ,prId:1002,fbId:'100002196848045'},
            {id:3,name:'Midhun',mob:1472583652,prId:1001,fbId:'100002196848049'},
            {id:4,name:'Ilyas',mob:10214205478,prId:1001,fbId:'100002196848047'}
        ];

        $scope.prDepartment=[];
        $scope.prInfo=[
            {prId:1001,prCaption:'Cloud Project',prDep:1},
            {prId:1002,prCaption:'Java Project',prDep:2},
            {prId:1003,prCaption:'Embedded Project',prDep:4}

        ];

        $scope.err;
        $scope.selectedArray=[];
        $scope.popup={'visibility': 'hide','opacity': 0};
        $scope.selectedFrnd=[];
        $scope.newMsg={
            id:[],
            msg:'',
            attachment:null
        };
        $scope.selProject=null;
        $scope.msgData=[];
        $scope.selDep=null;
        $scope.isWaiting=true;
        $scope.isLoading=true;

        $scope.getDepartment=function(){
            departmentServices.getDepartment()
                .then(function(response){
                    $scope.prDepartment=response.data;
                },function(err){

                });

        };

        $scope.getFriendsList=function(){
            $scope.isWaiting=true;
            advancedFbFriendsListServices.getFriendsList()
                .then(function(response){
                    $scope.friendList=response.data;
                    $scope.isWaiting=false;
                },function(err){
                    alert(err);
                })
        };


        $scope.getContactsByPrId=function(){
            $scope.selectedFrnd=[];
            $scope.isWaiting=true;
            var data=[];
            var selStud=$filter("filter")($scope.contInfo,{prId:$scope.selProject});

            advancedFbFriendsListServices.getFriendsList()
                .then(function(response){
                    $scope.friendList=response.data;
                    data=$scope.friendList.slice();
                    console.log(data);
                    $scope.friendList=[];
                    for(var i=0;i<selStud.length;i++){

                        var obj=$filter("filter")(data,{userID:selStud[i].fbId});

                        for(var j=0;j<obj.length;j++){
                            $scope.friendList.push(obj[j]);
                        }

                    }
                    $scope.isWaiting=false;

                },function(err){
                    alert(err);
                })
        };

        $scope.getContactsByDep=function(){
            $scope.selectedFrnd=[];
            $scope.isWaiting=true;
            var data=[];
            // var selStud=$filter("filter")($scope.contInfo,{prId:$scope.selProject});
            if($scope.selDep===null) return;
            advancedFbFriendsListServices.getFriendsList()
                .then(function(response){
                    $scope.friendList=response.data;
                    data=$scope.friendList.slice();
                    var selProjects=$filter("filter")($scope.prInfo,{prDep:$scope.selDep.DEP_ID});
                    $scope.friendList=[];
                    for(var i=0;i<selProjects.length;i++){

                        var obj=$filter("filter")($scope.contInfo,{prId:selProjects[i].prId});

                        for(var j=0;j<obj.length;j++){
                            console.log(obj[j]);
                            var obj1=$filter("filter")(data,{userID:obj[j].fbId});
                            for(var k=0;k<obj1.length;k++) {

                                $scope.friendList.push(obj1[k]);
                            }
                        }

                    }
                    $scope.isWaiting=false;

                },function(err){
                    alert(err);
                })
        };


        $scope.sendMessage=function(){
            $scope.newMsg.id=$scope.selectedFrnd.slice();
            appendStringAsNodes(document.getElementById("msgContent"), '<h5>'+$scope.newMsg.msg+'</h5>');
            document.getElementById("msgContent").scrollTop=document.getElementById("msgContent").scrollHeight;

            advancedFbFriendsListServices.sendMessage($scope.newMsg)
                .then(function(response){
                    alert(response.data);
                },function (err) {

                });

            $scope.newMsg={
                id:'',
                msg:'',
                attachment:null
            };
        };

        $scope.showMsgDialog=function(){

            // fbFriendsListServices.getMessageById(id)
            //     .then(function(response){
            //         $scope.msgData=response.data;
            //         $scope.selectedFrnd=id;
                    $scope.popup={'visibility': 'visible','opacity': 1};
                // },function (err) {
                //
                // });

        };

        $scope.showFileDialog=function(){
            document.getElementById("file1").click();
        };

        $scope.sendFile=function(){
            if($scope.newMsg.attachment===null || $scope.newMsg.attachment===null) return
            $scope.isLoading=true;
            $scope.newMsg.id=$scope.selectedFrnd.slice();
            appendStringAsNodes(document.getElementById("msgContent"), '<img ng-show="{{isLoading}}" src="/images/fb/loading.gif" style="width: 60px;height: 60px; margin-left: 15px;"><br>');
            document.getElementById("msgContent").scrollTop=document.getElementById("msgContent").scrollHeight;
            advancedFbFriendsListServices.sendFile($scope.newMsg)

                .then(function(response){
                    var index=document.getElementById("msgContent").childNodes.length-2;
                    document.getElementById("msgContent").removeChild(document.getElementById("msgContent").childNodes[index]);
                    $scope.isLoading=false;
                    if($scope.newMsg.attachment.name.split('.').pop()==='gif'||$scope.newMsg.attachment.name.split('.').pop()==='jpg'||$scope.newMsg.attachment.name.split('.').pop()==='png')
                        appendStringAsNodes(document.getElementById("msgContent"), '<img src=/uploads/fb/'+ response.data.insertId + '.'+$scope.newMsg.attachment.name.split('.').pop()+ '  style="width: 60px;height: 60px;margin-left: 15px;"><br> ');
                    else
                        appendStringAsNodes(document.getElementById("msgContent"), '<img src="/images/fb/document.png" style="width: 60px;height: 60px;margin-left: 15px;"><br>File Name'+$scope.newMsg.attachment.name+'<br> ');
                    document.getElementById("msgContent").scrollTop=document.getElementById("msgContent").scrollHeight;

                },function(err){
                    alert(err);
                })
        };

        $scope.addToFriendList=function(id){
            if($scope.selectedArray[id]===true)
                $scope.selectedFrnd.push($scope.friendList[id].userID);
            else
                $scope.selectedFrnd.remove($scope.friendList[id].userID);
        };

        Array.prototype.remove = function() {
            var what, a = arguments, L = a.length, ax;
            while (L && this.length) {
                what = a[--L];
                while ((ax = this.indexOf(what)) !== -1) {
                    this.splice(ax, 1);
                }
            }
            return this;
        };


        $scope.getFriendsList();
        $scope.getDepartment();

    };



    function appendStringAsNodes(element, html) {
        var frag = document.createDocumentFragment(),
            tmp = document.createElement('body'), child;
            tmp.innerHTML = html;
        while (child = tmp.firstChild) {
            frag.appendChild(child);
        }
        element.appendChild(frag); // Now, append all elements at once
        frag = tmp = null;
    }

})();


