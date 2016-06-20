
var mysql=require('mysql');
var fs=require('fs');
var   db= require('../config/db');
var   serDocument= require('../config/db/documents/documentdb');
var   con=mysql.createConnection(db);
var   docService=new serDocument(con);


    exports.searchDocument=function(req,res){
            var type=req.query.docType;
            var dep=req.query.dep;
            var serStr=req.query.serStr;
            var result;
            // console.log(req.session.userMode);
            res.writeHead(200, {"Content-Type": "application/json"});

            if(type===''||type===null || isNaN(type) ||dep===''||dep===null || isNaN(dep)) return res.end("invalid");

            console.log("type:"+type+"dep="+dep);

            if(type==='-1' && dep==='-1')
            {
              docService.getAllDoc(serStr,function(err,data){
                result=data;
                console.log(data);
                res.end(JSON.stringify(result));
              });
            }
            else if(type==='-1')
                docService.getDocByDep(serStr,dep,function(err,data){
                result=data;
                res.end(JSON.stringify(result));
              });
            else if(dep==='-1')
              docService.getDocByType(serStr,type,function(err,data){
                result=data;
                res.end(JSON.stringify(result));
              });
            else
              docService.getDocByTypeDep(serStr,type,dep,function(err,data){
                result=data;
                res.end(JSON.stringify(result));
              });
    };

  

    exports.getDocument=function(req,res){

      var id=req.query.id,ext,filename,myData;
      if(id==='' || id===null || isNaN(id)) {res.end("invalid");  return};
      docService.getDocById(id,0,function(err,data){
              // res.end(JSON.stringify(data));
              if(data.length <=0) {res.end("invalid"); return};
              filename=data[0].docFile;
              ext = filename.substring(filename.lastIndexOf('.') + 1);
              fs.access(__dirname+"/../public/uploads/documents/"+data[0].ID+"."+ext, fs.F_OK, function(err) {
                  if (!err) {
                      data[0].isFileExist=true;
                  } else {
                      data[0].isFileExist=false;
                  }
                  res.json(data)
              });


          });
    };


    exports.deleteDocument=function(req,res){
        var data = req.body;
        console.log(data);
        if(data.ID==='' || data.ID===null || isNaN(data.ID)) return res.end("invalid");
        docService.deleteDoc(data,function(){
            console.log("Deleted Record...."+data);
            res.end('success');
        });
    };





