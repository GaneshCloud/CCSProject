

var   smsDb= require('../config/db/sms/smsdb');
var msg91 = require("msg91")("118856AnX1aObPdz5780a27d", "CCSPVT", "4" );
var   memDb=require("../config/db/sms/memberDb");

exports.sendMessage=function(req,res){



        var loop2=false,loop1=false,contactMob=[],index=0;

        if(req.body.selectedContacts.length<=0)  loop1=true;
        for (var i = 0; i < req.body.selectedContacts.length-1; i++) {

            contactMob.push(req.body.selectedContacts[i]);
            index++;
            if(i===req.body.selectedContacts.length-2) loop1=true;
        }

        while(!loop1) {
            require('deasync').sleep(100);
        }

    if(req.body.selectGroup!==null){
        if(req.body.selectGroup.length<=0)  loop2=true;
        for(var j=0;j<req.body.selectGroup.length;j++){
            memDb.listMemberByGroup(req.body.selectGroup[j].grpId,function(err,result){
                for (var i = 0; i < result.length; i++) {
                    contactMob.push(result[i].memMob);
                    index++;

                    if(j===req.body.selectGroup.length-1) loop2=true;
                }

            });
            while(!loop2) {
                require('deasync').sleep(100);
            }

        };

       console.log(contactMob);


    }
    msg91.send(req.body.selectedContacts, req.body.smsText, function(err, response){
       if(err) return;
        console.log(err);
        console.log(response);
    });

    smsDb.insertSmsData(req.body,function (err,result) {
       if(err)
           console.log(err.message);
        else
           res.send("success");
    });
};

exports.getSmsData=function(req,res){
    smsDb.getSmsData(function (err,result) {
        if(err)
            console.log(err.message);
        else
            res.json(result);
    });
};

exports.getSmsDataById=function(req,res){
    smsDb.getSmsDataById(req.params.id,function (err,result) {
        console.log(req.params.id);
        if(err)
            console.log(err.message);
        else
            res.json(result);
    });
};