
var mysql=require('mysql');
var   db= require('../../db');
var   con=mysql.createConnection(db);

exports.insertGroup = function (data,cb){


    var result=null,myErr=null,qry;

    insertData=data;
    insertData.crDate=new Date();
    console.log(insertData.grpId);

    if(insertData.grpId==='')
        qry='INSERT INTO TBL_GROUP SET ?';
    else
        qry='UPDATE  TBL_GROUP SET ? WHERE ID='+insertData.grpId;

    delete insertData.grpId;
    


    con.query(qry,insertData,  function(err,insertId){
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

exports.listGroup = function (cb){

    con.query('SELECT g.id as grpId,g.grpName as grpName,g.crDate as crDate,count(m.grpId) as memCount FROM TBL_GROUP g LEFT OUTER JOIN TBL_GROUPMAPPER m ON g.id=m.grpId group by g.id',  function(err,result){
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

exports.getGroupById = function (id,cb){

    con.query('SELECT g.id as grpId,g.grpName as grpName,g.crDate as crDate,m.count(*) as memCount FROM TBL_GROUP g WHERE id='+id,  function(err,result){
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

exports.deleteGroup = function (id,cb){
    
    con.query('DELETE FROM TBL_GROUP WHERE id='+id,  function(err,result){
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

