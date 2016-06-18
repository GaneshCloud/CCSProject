

var mysql=require('mysql'),
    path = require('path'),
    fs=require("fs"),
    admZip = require('adm-zip'),
    db= require('../config/db'),
    serDocument= require('../config/db/documents/documentdb'),
    con=mysql.createConnection(db),
    docService=new serDocument(con),
    unZipFile=function(){};


    unZipFile=function(id,cb){

            var sync=false;
            var files=[];
            var fileName="";

            docService.getDocById(id,function(err,data){
                if(data.length<=0) cb("NoData",files);
            fileName=data[0].DOCFILE;
            var ext = fileName.substring(fileName.lastIndexOf('.') + 1);
            var zip = new admZip(__dirname+"/../public/uploads/documents/"+id+"."+ext);
            var zipEntries = zip.getEntries();


            zipEntries.forEach(function(zipEntry) {


            files.push({file : zipEntry.entryName}) ;
            console.log(files);
            });
            sync=true;

            });
            while(!sync) {
            require('deasync').sleep(1000);
                cb("success",files);
            }

    };

    exports.viewDocument=function(req,res){
        var id = req.query.id;

        if(id==='' || id===null || isNaN(id)) return res.end("invalid");
        docService.incrViews(id,function(err){
           if(err) throw err;
            res.end("valid");
        });


          //res.json={mode:req.session.userMode};

    };

    exports.downloadDocument=function(req,resp){

        var id = req.query.id;

        if(id==='' || id===null || isNaN(id)) return resp.end("invalid");
        // console.log(id);
        var ext="";
        var filename;


        docService.getDocById(id,function(err,data){
            if(data.length <=0) resp.end("NO_DOCUMENT");
        filename=data[0].DOCFILE;
        ext = filename.substring(filename.lastIndexOf('.') + 1);
        docService.incrDown(id,function(err,res){
        if(err) throw err;
        else
        {
          console.log(res);
        }

              fs.access(__dirname+"/../public/uploads/documents/"+id+"."+ext, fs.F_OK, function(err) {
                if (!err) {
                  resp.download(__dirname+"/../public/uploads/documents/"+id+"."+ext);
                } else {
                  resp.end("No_file_found");
                }

              });

        });

      });

    };

    exports.nextDocument=function(req,res){
        var id=req.query.id;
        if(id==='' || id===null || isNaN(id)) return res.end("invalid");

      docService.getNextDocument(id,function(err,data){
        console.log(data);
      res.end(JSON.stringify(data));

    });

    };


    exports.prevDocument=function(req,res){
      var id=req.query.id;
        if(id==='' || id===null || isNaN(id)) return res.end("invalid");

      docService.getPrevDocument(id,function(err,data){
      console.log(data);
      res.end(JSON.stringify(data));

    });

    };

    exports.userMode=function(req,res,next){
        var userMode={mode:req.session.userMode};
        res.end(JSON.stringify(userMode));
    };


    exports.readZip=function(req,res){

      var id=req.query.id,files;
        if(id==='' || id===null || isNaN(id)) return res.end("invalid");

        console.log(id);
        unZipFile(id,function(err,files){
            console.log("inside");
            console.log("err"+err);
            if(err==='NoData') res.end("No Data");
            else
                res.end(JSON.stringify(files));
        });




    };
