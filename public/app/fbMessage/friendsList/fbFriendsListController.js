/**
 * Created by Administrator on 05.07.2016.
 */
/**
 * Created by Administrator on 05.07.2016.
 */
(function(){
    angular
        .module("myApp")
        .controller("fbFriendsListController",fbFriendsListController)
        .directive('fileInput', ['$parse','$http', function ($parse,$http) {
        return {
            restrict: 'A',
            link: function (scope, element, attributes) {
                element.bind('change', function () {

                    $parse(attributes.fileInput)
                        .assign(scope,element[0].files[0]);
                         scope.$apply();
                         console.log(element[0].files[0]);
                         scope.sendFile();
                });
            }
        };
    }]);

    fbFriendsListController.$inject=[
        '$scope',
        'fbFriendsListServices'
    ];

    function fbFriendsListController($scope,fbFriendsListServices){

        $scope.friendList=[];
        $scope.err;
        $scope.popup={'visibility': 'hide','opacity': 0};
        $scope.selectedFrnd=null;
        $scope.newMsg={
            id:'',
            msg:'',
            attachment:null
        };
        $scope.isLoading;
        $scope.msgData=[];

        var getFriendsList=function(){
            fbFriendsListServices.getFriendsList()
                .then(function(response){
                    $scope.friendList=response.data;
                },function(err){
                    alert(err);
                })
        };



        $scope.sendMessage=function(){
            $scope.newMsg.id=$scope.friendList[$scope.selectedFrnd].userID;
            appendStringAsNodes(document.getElementById("msgContent"), '<h5>'+$scope.newMsg.msg+'</h5>');
            document.getElementById("msgContent").scrollTop=document.getElementById("msgContent").scrollHeight;

            fbFriendsListServices.sendMessage($scope.newMsg)
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

        $scope.showMsgDialog=function(id){

            fbFriendsListServices.getMessageById(id)
                .then(function(response){
                    $scope.msgData=response.data;
                    $scope.selectedFrnd=id;
                    $scope.popup={'visibility': 'visible','opacity': 1};
                },function (err) {

                });

        };

        $scope.showFileDialog=function(){
            document.getElementById("file1").click();
        };

        $scope.sendFile=function(){

            $scope.isLoading=true;
            $scope.newMsg.id=$scope.friendList[$scope.selectedFrnd].userID;
            appendStringAsNodes(document.getElementById("msgContent"), '<img ng-show="{{isLoading}}" src="/images/fb/loading.gif" style="width: 60px;height: 60px; margin-left: 15px;"><br>');
            document.getElementById("msgContent").scrollTop=document.getElementById("msgContent").scrollHeight;
            fbFriendsListServices.sendFile($scope.newMsg)

                .then(function(response){
                    var index=document.getElementById("msgContent").childNodes.length-2;
                    document.getElementById("msgContent").removeChild(document.getElementById("msgContent").childNodes[index]);
                    $scope.isLoading=false;
                    if($scope.newMsg.attachment.name.split('.').pop()==='gif'||$scope.newMsg.attachment.name.split('.').pop()==='jpg'||$scope.newMsg.attachment.name.split('.').pop()==='png')
                        appendStringAsNodes(document.getElementById("msgContent"), '<img src=/uploads/fb/'+ response.data.insertId + '.'+$scope.newMsg.attachment.name.split('.').pop()+ '  style="width: 60px;height: 60px;margin-left: 15px;"><br> ');
                    else
                        appendStringAsNodes(document.getElementById("msgContent"), '<img src="/images/fb/document.png" style="width: 60px;height: 60px;margin-left: 15px;"><br> ');
                    document.getElementById("msgContent").scrollTop=document.getElementById("msgContent").scrollHeight;

                },function(err){
                    alert(err);
                })
        }


        // token=function(id){
        //     fbFriendsListServices.token()
        //         .then(function(response){
        //             alert(response.data);
        //         },function (err) {
        //
        //         });
        // };
        // token();

        getFriendsList();

    };

    function appendStringAsNodes(element, html) {
        var frag = document.createDocumentFragment(),
            tmp = document.createElement('body'), child;
        tmp.innerHTML = html;
        // Append elements in a loop to a DocumentFragment, so that the browser does
        // not re-render the document for each node
        while (child = tmp.firstChild) {
            frag.appendChild(child);
        }
        element.appendChild(frag); // Now, append all elements at once
        frag = tmp = null;
    }

})();


