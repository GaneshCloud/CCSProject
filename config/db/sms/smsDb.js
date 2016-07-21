
var mysql=require('mysql');
var   db= require('../../db');
var   con=mysql.createConnection(db);
var   memDb=require("./memberDb");

exports.insertSmsData = function (data,cb){


    var result=null,myErr=null;
    var insertMasterData={},insertSubData=[];
    var loop1=false,loop2=false;

    insertMasterData.smsDate=new Date();
    insertMasterData.msg=data.smsText;
    console.log(data.selectedContacts.length);



    con.query('INSERT INTO TBL_SMS_MASTER SET ?',insertMasterData,  function(err,insertId){
        if(err)
        {
            myErr=err;
            cb( myErr,result);
        }
        else
        {
            var arr = [],index=0;
            if(data.selectedContacts.length<=0)  loop1=true;
            for (var i = 0; i < data.selectedContacts.length-1; i++) {
                insertSubData[index]=[];

                insertSubData[index].push(parseInt(insertId.insertId));
                insertSubData[index].push(data.selectedContacts[i]);
                insertSubData[index].push(0);
                index++;

                if(i===data.selectedContacts.length-2) loop1=true;
            }

            while(!loop1) {
                require('deasync').sleep(100);
            }





            if(data.selectGroup!==null){

                if(data.selectGroup.length<=0)  loop2=true;
                for(var j=0;j<data.selectGroup.length;j++){
                    memDb.listMemberByGroup(data.selectGroup[j].grpId,function(err,result){
                        console.log(result);
                        for (var i = 0; i < result.length; i++) {
                            insertSubData[index]=[];

                            insertSubData[index].push(parseInt(insertId.insertId));
                            insertSubData[index].push(result[i].memMob);
                            insertSubData[index].push(0);
                            index++;
                            // console.log(j);
                            console.log("data:"+j===data.selectGroup.length-1);
                            console.log("loop2 "+loop2);
                            if(j===data.selectGroup.length-1) loop2=true;
                        }

                });
                    while(!loop2) {
                        console.log("hai");
                        require('deasync').sleep(100);
                    }


                };




            }

            while(!loop2) {
                console.log("hai");
                require('deasync').sleep(100);
            }
            console.log("dattttt:"+insertSubData);
            con.query('INSERT INTO TBL_SMS_SUB (smsId,mobNo,smsSts)  VALUES ?',[insertSubData],  function(err,insertSubId){
                if(err)
                {
                    myErr=err;
                    cb( myErr,result);
                }
                else
                {
                    result=insertSubId;
                    cb( myErr,result);
                }

            });

        }

    });


};

exports.getSmsData = function (cb){
    con.query('SELECT s.id as id,s.smsDate as smsDate,s.msg as msg,count(*) as contactCount FROM TBL_SMS_MASTER s LEFT OUTER JOIN TBL_SMS_SUB m ON s.id=m.smsId group by m.smsId',function(err,result){
            cb( err,result);
    });
};

exports.getSmsDataById = function (id,cb){
    console.log('SELECT s.smsDate as smsDate,s.msg as msg,sub.mobNo as mobNo,sub.smsSts as smsSts FROM TBL_SMS_MASTER s LEFT OUTER JOIN TBL_SMS_SUB sub ON s.id=sub.smsId WHERE s.id='+id);
    con.query('SELECT s.smsDate as smsDate,s.msg as msg,sub.mobNo as mobNo,sub.smsSts as smsSts FROM TBL_SMS_MASTER s LEFT OUTER JOIN TBL_SMS_SUB sub ON s.id=sub.smsId WHERE s.id='+id,function(err,result){
        cb( err,result);
    });
};



