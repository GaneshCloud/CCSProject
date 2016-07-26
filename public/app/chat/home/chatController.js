(function() {
        angular
            .module('myApp')
            .controller('chatController', chatController);

        chatController.$inject = ['$scope','$window','$filter','spinnerService','dashboardService','chatService','uploadedChatFilePath','uploadedChatImagePath','uploadedProfilePicturePath','filterFilter','$window'];

        function chatController($scope,$window,$filter,spinnerService,dashboardService,chatService,uploadedChatFilePath,uploadedChatImagePath,uploadedProfilePicturePath,filterFilter,$window) {

            //var user_name = window.prompt('Enter Your Name'); //getting user name

            var socket = io.connect();

            $scope.clicked = null;
            $scope.selected_id = null;
            $scope.select_userid=null;;
            $scope.msgs = [];
            $scope.myself_msg=[];
            $scope.my_id = null;
            $scope.is_msg_show = true;
            $scope.message=[];
            $scope.image=null;
            $scope.profilePicPath=uploadedProfilePicturePath;
            $scope.uploadImagePath=uploadedChatImagePath;
            $scope.uploadFilePath=uploadedChatFilePath;
            $scope.data=[];
            $scope.readData=[];
            $scope.myRedObjects=[];
            $scope.meg_read=0;



            $scope.getChatinfo=function()
            {
                chatService.getChatinfo().then(function(result)

                {
                    $scope.data = result.data;
                    msgs1 = $filter('filter')($scope.data,{select_userid: $scope.select_userid,my_userid: $scope.userData.userid});//,{},{my_userid: $scope.select_userid},{select_userid: $scope.userData.userid}
                    msgs2 = $filter('filter')($scope.data,{my_userid2: $scope.select_userid,select_userid2: $scope.userData.userid});//,{},{my_userid: $scope.select_userid},{select_userid: $scope.userData.userid}
                    for(i=0;i<msgs2.length;i++){
                        msgs1.push(msgs2[i]);
                    }

                    // $scope.msgs=msgs1.slice();
                    $scope.msgs = $filter('orderBy')(msgs1,'date');
                    //$scope.getChatinfo();
                    //

                });
            };




            // -------------------------lodout------------------------------------------------- //
            $scope.onLogout = function() {

                if ($window.confirm('Are You Sure ! Do you need to Log Out?')) {


                    socket.on('user entrance', function (data, my_id) {
                        //checking the user id
                        $scope.user_show = data;
                        $scope.datas = data.length;
                    });
                    spinnerService.show('html5spinner');
                    dashboardService.logout();

                }
            };
            // -------------------------Dashboard------------------------------------------------- //
            $scope.goToDashboard = function() {
                spinnerService.show('html5spinner');
                chatService.goToDashboard();

            };

            $scope.uploadImage = function(image) {


                $scope.imageChanged = true;

                $scope.file = image[0];

                chatService.send_msg($scope.file).then(function(result) {

                    var data_server = {
                        id: $scope.selected_id,
                        msg: null,
                        name: $scope.userData.userid + '-' + $scope.userData.firstName,
                        myid: $scope.my_id,
                        selectUserid: $scope.select_userid,
                        my_userid: $scope.userData.userid,
                        date: new Date(),
                        image: result.data,
                        imagePath: uploadedChatImagePath + result.data,
                        file: null,
                        filePath: null,
                        profile_pic:$scope.userData.profilePic,
                        msg_read: $scope.meg_read

                    };


                    $scope.send_msg(data_server);
                    alert("You send msg successfully!.");


                });

            };

            $scope.updateRead=function(id)
            {

                var my_userid= $scope.userData.userid;
                var selectUserid=$scope.select_userid;

                chatService.updateRead(my_userid,selectUserid).then(function(result)
                {

                    // $scope.msgReadData=result.data;
                    $scope.getReadinfo();

                });

            };

            $scope.uploadFile = function(files) {

                $scope.docFile = files[0];

                chatService.send_File( $scope.docFile).then(function(results) {

                        var data_server = {
                            id: $scope.selected_id,
                            msg: $scope.msg_text,
                            name: $scope.userData.userid + '-' + $scope.userData.firstName,
                            myid: $scope.my_id,
                            selectUserid: $scope.select_userid,
                            my_userid: $scope.userData.userid,
                            date: new Date(),
                            image: null,
                            imagePath: null,
                            file: results.data,
                            filePath: uploadedChatFilePath + results.data,
                            profile_pic:$scope.userData.profilePic,
                            msg_read: $scope.meg_read

                        };

                    $scope.send_msg(data_server);
                    alert("You send msg successfully!.");
                });

            };


            $scope.openFile=function(file)
            {

                $window.open(file);


            };
            $scope.openImage=function(image)
            {
                $window.open(image);


            };


            dashboardService.checkAdmin().then(function (result) {
                $scope.userData = result;

                $scope.getChatinfo();
                socket.emit('user name',  $scope.userData); // sending user name to the server

            });

            $scope.enableImage=function() {
                document.getElementById("f1").click();
                //alert("You send msg successfully!.");

                //$scope.file='';

            };
            $scope.enableFile=function () {
                document.getElementById("f2").click();
            };

            socket.on('user entrance', function (data, my_id) {
                //checking the user id
                if ($scope.my_id == null) {
                    $scope.my_id = my_id;
                }
                $scope.user_show = data;
                //$scope.datas = data.length-1;
                $scope.$apply();
                $scope.getReadinfo();

            });

            //function to send messages.
            $scope.send_msg = function (data_server) {

                if ($scope.selected_id == $scope.my_id) {
                    alert("You can't send mmsg to your self.");
                } else {
                        if(data_server == null)
                        {
                            data_server = {
                                id: $scope.selected_id,
                                msg: $scope.msg_text,
                                name: $scope.userData.userid + '-' + $scope.userData.firstName,
                                myid: $scope.my_id,
                                selectUserid: $scope.select_userid,
                                my_userid: $scope.userData.userid,
                                date: new Date(),
                                image: null,
                                imagePath: null,
                                file: null,
                                filePath: null,
                                profile_pic:$scope.userData.profilePic,
                                msg_read: $scope.meg_read

                            };

                        }
                    $scope.msgs.push(data_server);
                    $scope.msg_text = '';
                    $scope.file = null;
                    $scope.docFile=null;
                    document.getElementById("chatbox").scrollTop=document.getElementById("chatbox").scrollHeight;
                    socket.emit('send msg', data_server);


                        //socket.emit('send myself',data_server);
                    alert("You send msg successfully!.");
                    // $scope.$apply();




                }
            };

            $scope.showFile=function(file)
            {
              if(file!=null)
              {
                  return true;
              }
              return false;
            };
            $scope.showImage=function(image)
            {
                if(image!=null)
                {
                    return true;
                }
                return false;
            };

           //to highlight selected row
            $scope.clicked_highlight = function (id,user_id) {

                $scope.getChatinfo();
                var msgs1=[],msgs2=[];
                $scope.clicked = id;
                $scope.selected_id = id;
                $scope.select_userid=user_id;
                console.log($scope.data);
                $scope.updateRead($scope.select_userid);
                // msgs1 = $filter('filter')($scope.data,{select_userid: $scope.select_userid,my_userid: $scope.userData.userid});//,{},{my_userid: $scope.select_userid},{select_userid: $scope.userData.userid}
                // msgs2 = $filter('filter')($scope.data,{my_userid2: $scope.select_userid,select_userid2: $scope.userData.userid});//,{},{my_userid: $scope.select_userid},{select_userid: $scope.userData.userid}
                // for(i=0;i<msgs2.length;i++){
                //     msgs1.push(msgs2[i]);
                // }
                //
                // // $scope.msgs=msgs1.slice();
                // $scope.msgs = $filter('orderBy')(msgs1,'date');
                // //$scope.getChatinfo();
                // $scope.updateRead();


                

            };

            //on exit updating the List od users
            socket.on('exit', function (data) {
                $scope.user_show = data;
                $scope.$apply();
            });


            $scope.getReadinfo=function()
            {
                chatService.getReadinfo($scope.userData.userid).then(function(result)

                {

            if(result.data.length > 0){
                $scope.readData = result.data;
                console.log($scope.readData);
                            }
                    else
                        $scope.readData =[];





                },function(err){
                                    });
            };


            
            socket.on('get msg', function (data) {

                if(data.sender_id===$scope.selected_id){
                                   $scope.msgs.push(data);
                    $scope.updateRead();
                }
                $scope.$apply();
                document.getElementById("chatbox").scrollTop=document.getElementById("chatbox").scrollHeight;
                $scope.getReadinfo();

            });


        }
})();