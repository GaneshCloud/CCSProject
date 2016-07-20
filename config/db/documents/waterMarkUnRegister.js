var msopdf = require('../../../lib');
var path=require('path');
var exec = require('child_process').exec;
    var fs= require('fs');

module.exports=function(connection){
    
    this.getPdfFiles=function(cb) {
        var qry = "select Doc_File from file_uploading";

        console.log("get thedata from dp" + qry);

        connection.query(qry, function (err, results) {

            if (err) {
                cb(err,results);
            }
            else {
                console.log(results);
                cb(err,results);
                var data = JSON.stringify(results);
                var jsonDATA = JSON.parse(data);
                console.log(jsonDATA[0]);
                var sync=false;
                var i;
               //res.send(results);

                msopdf(null, function (error, office) {


                    if (error) {
                        console.log("Init failed", error);
                        return;
                    }


                    console.log(jsonDATA.length);
                    for (i = 0; i <= jsonDATA.length - 1; i++) {

                        sync=false;
                        var ext = path.extname(jsonDATA[i].Doc_File);
                        
                        if (ext === '.doc') {


                            office.word({
                                input: "public/uploads/waterMark/" + jsonDATA[i].Doc_File,
                                output: "public/uploads/waterMark/" + jsonDATA[i].Doc_File + ".pdf"
                            }, function (error, pdf) {

                                if (error) {

                                    console.log("Woops", error);
                                } else {
                                    console.log("Saved to", pdf);
                                }


                            });


                            office.close(null, function (error) {
                                if (error) {
                                    console.log("Woops", error);
                                } else {
                                    console.log("Finished & closed");


                                }
                                console.log(i);
                                sync=true;



                            });
                        }
                        else
                            sync=true;
                        console.log(i);

                        while(!sync){
                            require("deasync").sleep(1000);

                        }


                    }



                    // if (i >= jsonDATA.length-1)
                    // {
                        waterMark();
                        // cb(err,results);
                    // }

                });


            }

        });
    };

    function waterMark(){
        fs.readdir('./public/uploads/waterMark/',function(err,files){
            if(err) return;
            files.forEach(function(file){
                console.log(file);
                var ext=path.extname(file);

                if(ext==='.pdf'){


                    var cmd = 'pdftk ./public/uploads/waterMark/'+file+' background ./public/waterMarkLabel.pdf output ./public/uploads/waterMarkpdf/'+file;

                    exec(cmd, function(error, stdout, stderr) {
                        console.log(error);
                    });
                }
            });
        });
    }

    };
