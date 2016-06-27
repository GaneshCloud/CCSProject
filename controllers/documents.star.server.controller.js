

var serReatingObj= require('../config/db/documents/ratingdb');

    exports.setStar=function(req,res){
        var sendData=req.body;

        if(sendData.DOC_ID==='' || sendData.DOC_ID===null) return res.end("invalid");

        sendData.USER_ID=req.session.data.id;
        serReatingObj.setStar(sendData,function(err,insId){
          if (err) {
              res.end({Error:err});
              return
          }else
              res.end("valid");
      });
    };

    exports.getStar=function(req,res){

        var id=req.query.DOC_ID;
        if(id==='' || id===null) return res.end("invalid");

        serReatingObj.getStar(id,function(err,data){
            if (err) {
                res.end({Error:err});
                return
            }else
                res.end(JSON.stringify(data));
      });
    };

    exports.getRatingInfo=function(req,res){
        var id=req.query.id;

        if(id==='' || id===null || isNaN(id)) return res.end("invalid");

        serReatingObj.getStarInfo(id,function(err,rows){
            if (err) {
                res.end({Error:err});
                return
            }else
                res.end(JSON.stringify(rows));

        });
    };

