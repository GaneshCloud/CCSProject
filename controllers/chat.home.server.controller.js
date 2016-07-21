
var multer=require('multer');
var forumConfig = require('../config/db/chatManager');

var storage=multer.diskStorage({

    destination:function(req, file, callback){
        callback(null, 'public/uploads/chat');
    },
    filename:function(req, file, callback){
        console.log(file);
        callback(null, file.fieldname + '-' + file.originalname);
        req.session.chatFile=file.fieldname + '-' + file.originalname;
    }
});
var upload=multer({storage:storage}).single('file');

exports.image=function(req,res)
{

upload(req,res,function(err) {
    if(err) {
        return res.end("Error uploading file.");
    }
    res.end(req.session.chatFile);
});
};




var fileStorage=multer.diskStorage({

    destination:function(req, file, callback){
        callback(null, 'public/uploads/chat/Files');
    },
    filename:function(req, file, callback){
        console.log(file);
        callback(null, file.fieldname + '-' + file.originalname);
        req.session.chatFile=file.fieldname + '-' + file.originalname;
    }
});
var fileUpload=multer({storage:fileStorage}).single('file');

exports.Files=function(req,res)
{

    fileUpload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end(req.session.chatFile);
    });
};

exports.chatInfo=function(req,res)
{
    console.log("sssjj");
    forumConfig.getChatinfo().then(function(results) {
            if (results) {
                console.log(results);
                res.send(results);
            }
        });
};



