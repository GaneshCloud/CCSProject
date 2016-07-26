

var   grpDb= require('../config/db/sms/groupDb');
var   grpMapperDb= require('../config/db/sms/groupMapper');

exports.createGroup=function(req,res){
    grpDb.insertGroup(req.body,function (err,result) {
        if(err)
            console.log(err.message);
        else
            res.send("success");
    });
};

exports.deleteGroup=function(req,res){
    grpDb.deleteGroup(req.params.id,function (err,result) {
        if(err)
            console.log(err.message);
        else
            res.send("success");
    });
};

exports.createMember=function(req,res){
    grpDb.insertMember(req.body,function (err,result) {
        if(err)
            console.log(err.message);
        else
            res.send("success");
    });
};

exports.listGroup=function(req,res){
    grpDb.listGroup(function (err,result) {
        if(err)
            console.log(err.message);
        else
           res.json(result);
    });
};

exports.getMemberByGrpId=function(req,res){

    grpMapperDb.getMemberByGrpId(req.params.id,function (err,result) {
        if(err)
            console.log(err.message);
        else
            res.json(result);
    });
};