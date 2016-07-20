(function() {
        angular
            .module('myApp')
            .controller('chatController', chatController);

        chatController.$inject = ['$scope','$filter','dashboardService','chatService','uploadedChatFilePath','uploadedChatImagePath','uploadedProfilePicturePath','filterFilter','$window'];

        function chatController($scope,$filter,dashboardService,chatService,uploadedChatFilePath,uploadedChatImagePath,uploadedProfilePicturePath,filterFilter,$window) {

            //var user_name = window.prompt('Enter Your Name'); //getting user name

            var socket = io.connect();

            $scope.clicked = null;
            $scope.selected_id = null;
            $scope.select_userid=null;
            $scope.msgs = [];
            $scope.myself_msg=[];
            $scope.my_id = null;
            $scope.is_msg_show = true;
            $scope.message=[];
            $scope.image=null;
            $scope.profilePicPath=uploadedProfilePicturePath;
            $scope.data=[];
            $scope.myRedObjects=[];



            $scope.getChatinfo=function()
            {
                chatService.getChatinfo().then(function(result)

                {
                    $scope.data = result.data;

                });
            };

            $scope.getChatinfo();



            $scope.uploadImage = function(image) {

                $scope.imageChanged = true;

                $scope.file = image[0];

                chatService.send_msg($scope.file).then(function(result) {

                    var data_server = {
                        id: $scope.selected_id,
                        msg: $scope.msg_text,
                        name: $scope.userData.userid + '-' + $scope.userData.firstName,
                        myid: $scope.my_id,
                        selectUserid: $scope.select_userid,
                        my_userid: $scope.userData.userid,
                        date: new Date(),
                        image: result.data,
                        imagePath: uploadedChatImagePath + result.data,
                        file: null,
                        filePath: null

                    };


                    $scope.send_msg(data_server);
                    alert("You send msg successfully!.");
                    document.getElementById("chatbox").scrollTop=document.getElementById("chatbox").scrollHeight;

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
                            filePath: uploadedChatFilePath + results.data

                        };


                    $scope.send_msg(data_server);
                    alert("You send msg successfully!.");




                });



            };


            $scope.openFile=function(filePath)
            {

                $window.open(filePath);
                alert('Successfully open');

            };



            dashboardService.checkAdmin().then(function (result) {
                $scope.userData = result;


                socket.emit('user name',  $scope.userData); // sending user name to the server

                var s= $scope.userData.length;

            });

            $scope.showImage=function() {
                document.getElementById("f1").click();
                //alert("You send msg successfully!.");

                //$scope.file='';

            };
            $scope.showFile=function () {
                document.getElementById("f2").click();
            };

            socket.on('user entrance', function (data, my_id) {
                //checking the user id
                if ($scope.my_id == null) {
                    $scope.my_id = my_id;
                }
                $scope.user_show = data;
                $scope.$apply();
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
                                filePath: null

                            };

                        }
                    $scope.msgs.push(data_server);
                    $scope.msg_text = '';
                    $scope.file = null;
                    $scope.docFile=null;
                    socket.emit('send msg', data_server);
                        //socket.emit('send myself',data_server);
                    alert("You send msg successfully!.");



                }
            };

           //to highlight selected row
            $scope.clicked_highlight = function (id,user_id) {
                $scope.clicked = id;
                $scope.selected_id = id;
                $scope.select_userid=user_id;
                $scope.msgs = $filter('filter')($scope.data, {select_userid: $scope.select_userid} || {my_userid: $scope.userData.userid});
            };

            //on exit updating the List od users
            socket.on('exit', function (data) {
                $scope.user_show = data;
                $scope.$apply();
            });

            //displaying the messages.
            socket.on('get msg', function (data) {
               $scope.msgs.push(data);
                //$scope.is_msg_show = true;
                $scope.$apply();
            });


        }
})();