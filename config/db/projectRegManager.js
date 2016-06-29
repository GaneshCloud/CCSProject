module.exports=function(connection){
    this.getProjects=function(cb){
        var qry="select q.projectCode as projectCode,q.title as title,q.department as department,q.subHeads as subHeads,q.software as software,q.hardware as hardware,q.catlogCode as catlogCode,q.domain as domain,q.id as id from erp_database q";
        console.log("get the data from DB" + qry);
        var err=null,results=null;
        connection.query(qry,function(err,results){
            if(err){
                cb(err,results);
                console.log('Error when get questions data : '+err);
            }
            else{
                console.log(results);
                cb(err,results);
            }
        });
    };

    this.postProjects=function(data,cb){
        var qry="INSERT INTO erp_database set ? ";
        console.log("store the data in DB" + qry);
        var err=null,results=null;
        connection.query(qry,data,function(err,results){
            if(err)
            {
                cb(err,results);
                console.log('Error when post question :' +err);
            }
            else
            {
                console.log(results);
                cb(err,results);
            }
        });
    };
    this.editProjects=function(id,data,cb){
        var qry="UPDATE erp_database set ? where id="+id+"";
        console.log("store the data in DB" + qry);
        var err=null,results=null;
        connection.query(qry,data,function(err,results){
            if(err)
            {
                cb(err,results);
                console.log('error when update the data :' +err);
            }
            else
            {
                console.log(results);
                cb(err,results);
            }

        });
    };
    this.deleteProjects=function(data,cb){
        var qry="DELETE from erp_database where id="+data;
        var err=null,results=null;
        if(data=='null') return cb('error',results);
        connection.query(qry,data,function(err,results){
            if(err)
            {
                cb(err,results);
                console.log('error when delete the data :' +err);
            }
            else
            {
                console.log(results);
                cb(err,results);
            }
        });
    };
};
