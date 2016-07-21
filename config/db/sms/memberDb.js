
var mysql=require('mysql');
var   db= require('../../db');
var   con=mysql.createConnection(db);
var grpMapper=require('./groupMapper');

exports.insertMember = function (data,cb){


    var result=null,myErr=null;

    insertData=data;
    insertData.crDate=new Date();
    var grpId=insertData.grpId;
    var memId=insertData.memId;


    if(insertData.memId==='')
        qry='INSERT INTO TBL_MEMBER SET ?';

    else{
        qry='UPDATE  TBL_MEMBER SET ? WHERE ID='+insertData.memId;
        memId=insertData.memId;
    }


    delete insertData.memId;
    delete insertData.grpId;



    con.query(qry,insertData,  function(err,insertId){
        if(err)
        {
            myErr=err;
            cb( myErr,insertId);
        }
        else
        {
            if(grpId!==''){
                grpMapper.insertgroupMapper({grpId:grpId,memId:memId!=='' ? memId: insertId.insertId},function (err,result) {
                    if(err)
                    {
                        myErr=err;
                        cb( myErr,result);
                    }
                    else{
                        myErr=err;
                        cb( myErr,result);
                    }


                });
            }
            else {
                myErr=err;
                cb( myErr,insertId);
            }

        }

    });


};


exports.listMember = function (cb){
    var result=null,myErr=null;
    con.query('SELECT m.id as memId,m.memName as memName,m.memMob as memMob,CONVERT(GROUP_CONCAT(g.grpName) USING "utf8") as groups  FROM TBL_MEMBER m LEFT OUTER JOIN TBL_GROUPMAPPER gm ON m.id=gm.memId LEFT OUTER JOIN TBL_GROUP g on gm.grpId=g.id  group by m.id',  function(err,result){
            myErr=err;
            cb( myErr,result);
    });


};

exports.listMemberByGroup = function (grpId,cb){
    var result=null,myErr=null;
    con.query('SELECT m.id as memId,m.memName as memName,m.memMob as memMob,CONVERT(GROUP_CONCAT(g.grpName) USING "utf8") as groups  FROM TBL_MEMBER m INNER JOIN TBL_GROUPMAPPER gm ON m.id=gm.memId INNER JOIN TBL_GROUP g on gm.grpId=g.id WHERE gm.grpId='+grpId+' group by gm.memId',  function(err,result){
        myErr=err;
        cb( myErr,result);
    });


};

exports.deleteMember = function (id,cb){
    con.query('DELETE FROM TBL_MEMBER WHERE id='+id,  function(err,result){
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



