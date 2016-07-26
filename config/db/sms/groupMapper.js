
var mysql=require('mysql');
var   db= require('../../db');
var   con=mysql.createConnection(db);

exports.insertgroupMapper = function (data,cb){

    var result=null,myErr=null;

    insertData=data;

    con.query('DELETE FROM  TBL_GROUPMAPPER WHERE memId='+insertData.memId+' and grpId='+insertData.grpId,  function(err,result) {
    });

    con.query('INSERT INTO TBL_GROUPMAPPER SET ?',insertData,  function(err,insertId){
        if(err)
        {
            myErr=err;
            cb( myErr,insertId);
        }
        else
        {
            myErr=err;
            cb( myErr,insertId);
        }

    });


};

exports.getMemberByGrpId = function (id,cb){
    var result=null,myErr=null;
    con.query('SELECT mem.memName as memName,mem.memMob as memMob,mem.crDate as crDate,g.id as mapperId,g.grpId as grpId FROM TBL_MEMBER mem LEFT OUTER JOIN TBL_GROUPMAPPER g on mem.id=g.memId WHERE g.grpId='+id,  function(err,result){
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

exports.removeFromGroup = function (id,cb){
    con.query('DELETE FROM TBL_GROUPMAPPER WHERE id='+id,  function(err,result){
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


