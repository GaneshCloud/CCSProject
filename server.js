process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('./config/express');
var forumConfig = require('./config/db/chatManager');
var multer=require('multer');

 var http = require('http');


var app = express();

var server = app.listen(3000, function () {
    var port = server.address().port;

    console.log('Server running at %s', port);
});
var io = require('socket.io').listen(server);
var SocketIOFileUpload = require('socketio-file-upload');

// creating array of users.

var users=[];



// This is auto initiated event when Client connects to Your Machien.
io.on('connection',function(socket) {
    console.log('connection');


    //Storing users into array as an object
    socket.on('user name', function (userData) {
        users.push({id: socket.id, user_name: userData.userid+'- '+userData.firstName,user_id:userData.userid,profilePic:userData.profilePic});
        console.log(userData.profilePic);
        len = users.length;
        len--;
        //Sending th user Id and List of users
        io.emit('user entrance', users, users[len].id);
    });

    //Sending message to Specific user
    socket.on('send msg', function (data_server) {
        forumConfig.send_msg(data_server).then(function(result){
            socket.broadcast.to(data_server.id).emit('get msg', {

                msg: data_server.msg,
                id: data_server.id,
                name: data_server.name,
                sender_id:data_server.myid,
                select_id:data_server.selectUserid,
                my_userid:data_server.my_userid,
                date:result[0].Dates,
                image:data_server.image,
                imagePath:data_server.imagePath,
                file: data_server.file,
                filePath: data_server. filePath
            });
        });


    });

    

// trying to serve the image file from the server
//
//         fs.readFile(__dirname + '/images/image.jpg', function(err, buf){
//             // it's possible to embed binary data
//             // within arbitrarily-complex objects
//             socket.emit('image', { image: true, buffer: buf.toString('base64') });
//             console.log('image file is initialized');
//         });



    //Removig user when user left the chatroom
    socket.on('disconnect', function () {
        for (var i = 0; i < users.length; i++) {
            if (users[i].id == socket.id) {
                users.splice(i, 1); //Removing single user
            }
        }
        io.emit('exit', users); //sending list of users
    });

    // Make an instance of SocketIOFileUpload and listen on this socket:
    var uploader = new SocketIOFileUpload();
    uploader.dir = "/srv/uploads";
    uploader.listen(socket);

    // Do something when a file is saved:
    uploader.on("saved", function(event){
        console.log(event.file);
    });

    // Error handler:
    uploader.on("error", function(event){
        console.log("Error from uploader", event);
    });
});

module.exports = {
    app : app,
    server : server
};
