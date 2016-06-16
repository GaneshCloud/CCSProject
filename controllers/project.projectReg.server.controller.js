
var mysql=require('mysql');
var db=require('../config/db.js');
var connection=mysql.createConnection(db);
var documents=require('../config/db/projectRegManager.js');
var objDocument=new documents(connection);


exports.home=function(req,res){
  res.sendfile('./public/app/core/layout.html');
};


exports.getData=function(req,res){
  objDocument.GET_DATA(function(err,result){
    if(err){
      res.send(err);
      //throw err;
    }
    else{
      res.send(result);
    }
  });
};

exports.postData=function(req,res){
  var data=req.body;
  objDocument.POST_DATA(data,function(err,result){
    if(err){

      //throw err;
      res.send(err);
    }
    else{
      res.send(result);
    }
  });
};

exports.EditData=function(req,res){
  var data=req.body;

  // console.log(req.params.id);
  objDocument.EDIT_DATA(data.id,req.body,function(err,result){
    console.log(result);
    if(err){
      //console.log(err);
      res.send(err);
      //throw err;
    }
    else{
      res.send(result);
    }
  });
};

exports.DeleteData=function(req,res){
  var data=req.body.id;
  objDocument.DELETE_DATA(data,function(err,result){
    if(err){
      res.send(err);
      //throw err;
    }
    else{
      res.send(result);
    }

  });
};