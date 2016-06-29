
var mysql=require('mysql');
var db=require('../config/db.js');
var connection=mysql.createConnection(db);
var documents=require('../config/db/projectRegManager.js');
var objDocument=new documents(connection);
exports.home=function(req,res){
  res.sendfile('./public/app/core/layout.html');
};

exports.getAllProject=function(req,res){
  objDocument.getProjects(function(err,result){
    if(err){
      res.send(err);
    }
    else{
      res.send(result);
    }
  });
};

exports.postProject=function(req,res){
  var data=req.body;
  objDocument.postProjects(data,function(err,result){
    if(err){
      res.send(err);
    }
    else{
      res.send(result);
    }
  });
};

exports.editProject=function(req,res){
  var data=req.body;
  objDocument.editProjects(data.id,req.body,function(err,result){
    console.log(result);
    if(err){
      res.send(err);
    }
    else{
      res.send(result);
    }
  });
};

exports.deleteProject=function(req,res){
  var data=req.body.id;
  objDocument.deleteProjects(data,function(err,result){
    if(err){
      res.send(err);
    }
    else{
      res.send(result);
    }
  });
};