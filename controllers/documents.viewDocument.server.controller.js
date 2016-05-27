

var mysql=require('mysql'),
    path = require('path'),
    fs=require("fs"),
    admZip = require('adm-zip'),
    db= require('../config/db'),
    serDocument= require('../config/db/documents/documentdb'),
    con=mysql.createConnection(db),
    docService=new serDocument(con),
    unZipFile=function(){};


    unZipFile=function(id){
            var sync=false;
            var files=[];
            var fileName="";

            docService.getDocById(id,function(err,data){
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
            return files;
            }

    };

    exports.viewDocument=function(req,res){
        var id = req.query.id;
        docService.incrViews(id,function(err){
           if(err) throw err;
        });


          res.json={mode:req.session.userMode};

    };

    exports.downloadDocument=function(req,resp){

        var id = req.query.id;
        console.log(id);
        var ext="";
        var filename;


        docService.getDocById(id,function(err,data){
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
                  resp.end("No file found");
                }

              });

        });

      });

    };

    exports.nextDocument=function(req,res){
        var id=req.query.id;

      docService.getNextDocument(id,function(err,data){
        console.log(data);
      res.end(JSON.stringify(data));

    });

    };


    exports.prevDocument=function(req,res){
      var id=req.query.id;

      docService.getPrevDocument(id,function(err,data){
      console.log(data);
      res.end(JSON.stringify(data));

    });

    };

    exports.userMode=function(req,res,next){
        var userMode={mode:req.session.userMode};
        console.log(userMode);
        if(userMode=="Admin"){
            next();
        }else{
            res.send("error");
        }
        res.end(JSON.stringify(userMode));
    };

    exports.readZip=function(req,res){

      var id=req.query.id;
      console.log(id);
      var data=unZipFile(id);
       console.log("inside");

      res.end(JSON.stringify(data));

    };
