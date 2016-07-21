

var   memDb= require('../config/db/sms/memberDb');
var   grpMapperDb= require('../config/db/sms/groupMapper');

exports.createMember=function(req,res){
    memDb.insertMember(req.body,function (err,result) {
        if(err)
            console.log(err.message);
        else
            res.send("success");
    });
};

exports.deleteMember=function(req,res){
    memDb.deleteMember(req.params.id,function (err,result) {
        if(err)
            console.log(err.message);
        else
            res.send("success");
    });
};

exports.listMember=function(req,res){
    memDb.listMember(function (err,result) {
        if(err)
            console.log(err.message);
        else
            res.json(result);
    });
};

exports.removeFromGroup=function(req,res){
    grpMapperDb.removeFromGroup(req.params.id,function (err,result) {
        if(err)
            console.log(err.message);
        else
            res.json(result);
    });
};


