
var mysql=require('mysql');
var db=require('../config/db');
var connection=mysql.createConnection(db);



exports.getData=function(req,res){
    var qry="select * from erp_database";
    console.log("get the data from DB" + qry);

    connection.query(qry,function(err,results){
        if(err){
            console.log('Error when get questions data : '+err);
        }
        else{
            console.log(results);
            res.send(results);
        }
    });
};

exports.postData=function(req,res){

    var qry="INSERT INTO erp_database set ? ";
    console.log("store the data in DB" + qry);

    connection.query(qry,req.body,function(err,results){
        if(err)
        {
            console.log('Error when post question :' +err);
        }
        else
        {
            console.log(results);
            res.send(results);
        }
    });
};

exports.EditData=function(req,res){

    // console.log(req.params.id);
    var qry="UPDATE erp_database set ? where id='"+req.params.id+"'";


    connection.query(qry,req.body,function(err,results){
        if(err)
        {
            console.log('error when update the data :' +err);
        }
        else
        {

            console.log(results);
            res.send(results);
        }

    });
};

exports.DeleteData=function(req,res){

    console.log(req.params.id);
    var qry="DELETE from erp_database where id='"+req.params.id+"'";


    connection.query(qry,function(err,results){
        if(err)
        {
            console.log('error when delete the data :' +err);
        }
        else
        {

            console.log(results);
            res.send(results);
        }

    });
};
