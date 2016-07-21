
var mysql=require('mysql');
var   db= require('../../db');
var   con=mysql.createConnection(db);

exports.svaFbMessage = function (data,cb){

    var result=null,myErr=null,qry,qrySub;
     var insertData=[],insertDataSub=[];
//         insertData.push(data.msg);
//         insertData.push(data.attach);
//         insertData.push(new Date());
// console.log(insertData);
    qry='INSERT INTO tbl_fbmessages SET  ?';

    con.query(qry,{msg:data.msg,attach:data.attach,msgDate:new Date()},  function(err,insertId){
        if(err)
        {
            myErr=err;
            cb( myErr,insertId);
        }
        else
        {
            for(var i=0;i<data.fbId.length;i++){
                insertDataSub[i]=[];
                insertDataSub[i].push(insertId.insertId);
                insertDataSub[i].push(data.fbId[i]);
                insertDataSub[i].push(1);
            }
            qrySub='INSERT INTO tbl_fb_msg_sub(msgId,fbId,sts) VALUES ?';
            con.query(qrySub,[insertDataSub],  function(err,insertSubId) {
                if (err) {
                    myErr = err;
                    cb(myErr, insertId);
                }
                else {
                    myErr = err;
                    cb(myErr, insertId);

                }
            });
        }

    });


};

exports.getMessageById = function (id,cb){

    var result=null,myErr=null,qry;
    qry='SELECT * FROM tbl_fbmessages WHERE fbId='+id;
    
    con.query(qry,insertData,  function(err,result){
        if(err)
        {
            myErr=err;
            cb( myErr,result);
        }
        else
        {
            myErr=err;
            cb( myErr,result);
        }

    });


};

exports.getMessages = function (cb){

    var result=null,myErr=null,qry;
    qry='SELECT fb.id as id,fb.msg as msg,fb.attach as attach,fb.msgDate as msgDate, count(*) as recCount FROM tbl_fbmessages fb LEFT OUTER JOIN tbl_fb_msg_sub s ON fb.id=s.msgId group by fb.id';

    con.query(qry,function(err,result){
        if(err)
        {
            myErr=err;
            cb( myErr,result);
        }
        else
        {
            myErr=err;
            cb( myErr,result);
        }

    });


};

