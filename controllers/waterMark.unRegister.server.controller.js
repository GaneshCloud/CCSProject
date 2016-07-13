var mysql=require('mysql');
var db=require('../config/db.js');
var connection=mysql.createConnection(db);
var waterMarkDoc=require('../config/db/documents/waterMarkUnRegister.js');
var objWaterMark=new waterMarkDoc(connection);
exports.home=function(req,res){

    res.sendfile('./public/app/core/layout.html');
};

exports.getAllDoc=function(req,res){
    objWaterMark.getPdfFiles(function(err,results){
        if(err){
            res.send(err);
        }
        else{
            res.send(results);
        }

    });
};