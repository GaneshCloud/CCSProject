

var mysql=require('mysql');
var fs=require('fs');
var   db= require('../../db');
var   con=mysql.createConnection(db);

// module.exports = function(con){

//var techDocument=require("../models/document");


exports.insertDoc=function(data,cb){

      var myErr=null,insertId=null;
      var qry="INSERT INTO TBL_DOCUMENTS SET ? ";
      if(Object.keys(data).length === 0 && data.constructor === Object) return cb( "error",insertId);
      con.query(qry,data, function(err,res){

      if(err)
      {
      	  myErr=err;
      	  cb( myErr,insertId);
      	}
      else
      {
        	insertId=res.insertId;
         	cb(myErr,res.insertId);
      }
      });
};



exports.getAllDoc=function(ser,cb){

      var myErr=null,data=null;
      var qry="SELECT A.ID as id,A.DOCCAPTION as docCaption,A.DOCTYPE as  docType,A.DOCDEP as docDep,A.DOCKEY as docKey,A.DOCDESC as docDesc,A.DOCDATE as docDate,A.DOCFILE as docFile,A.DOCNOVIEWS as docNoViews,A.DOCNODOWN as docNoDown,B.DEP_ID,B.DEP_NAME,COALESCE(FLOOR(AVG(C.STARS)),0) as star FROM TBL_DOCUMENTS A LEFT OUTER join TBL_DEPARTMENT B on (A.DOCDEP=B.DEP_ID) LEFT OUTER JOIN  TBL_DOC_STARS C  on  A.ID=C.DOC_ID WHERE A.DOCCAPTION LIKE '" + ser+ "%' GROUP BY A.id ORDER BY A.ID DESC";
      con.query(qry,function(err,res){

      if(err)
      {
          myErr=err;
          cb(myErr,data);
      }
      else
      {

          data=res;
          cb(myErr,data);
       }
   });
};

exports.updateDoc=function(id,uData,cb){

      var myErr=null,data=null;
      var qry="UPDATE TBL_DOCUMENTS SET ? WHERE ID="+id;
      con.query(qry,uData,function(err,res){
  		
      if(err)
      {
          myErr=err;
          cb(myErr,data);
      }
      else
      {
          data=res;
          cb(myErr,data);
       }
   });
};

exports.deleteDoc=function(id,cb){

     var myErr=null,data=null;
     var objectConstructor = {}.constructor;
    if(id.constructor!==objectConstructor)
    {
        cb("error",data);
        return;
    }
     if(id.ID=='' || id.ID==null)  return cb("error",data);
     //if(id.ID==""||id.ID==null) return false;


     var qry="DELETE  FROM TBL_DOCUMENTS WHERE ?";
	   con.query(qry,id,function(err,res){
  		
      if(err)
      { 
          myErr=err;
          cb(myErr,data);
      }
      else
      {
          data=res;
          cb(myErr,data);
       }
   });
};

exports.getDocById=function(id,nextPrev,cb){

    var myErr=null,data=null,qry;
    if( id===null || id==='') return cb("error",data);

      if(nextPrev===0)
            qry="SELECT  A.ID as id,A.DOCCAPTION as docCaption,A.DOCTYPE as docType,A.DOCDEP as docDep,A.DOCKEY as docKey,A.DOCDESC as docDesc,A.DOCDATE as docDate,A.DOCFILE as docFile,A.DOCNOVIEWS as docNoViews,A.DOCNODOWN as docNoDown FROM TBL_DOCUMENTS A WHERE A.ID="+id;
      else if(nextPrev===-1)
            qry='SELECT  A.ID as id,A.DOCCAPTION as docCaption,A.DOCTYPE as docType,A.DOCDEP as docDep,A.DOCKEY as docKey,A.DOCDESC as docDesc,A.DOCDATE as docDate,A.DOCFILE as docFile,A.DOCNOVIEWS as docNoViews,A.DOCNODOWN as docNoDown from TBL_DOCUMENTS A where A.ID = (select max(id) from TBL_DOCUMENTS where id < '+ id+' )';
      else if(nextPrev ===1)
            qry='SELECT  A.ID as id,A.DOCCAPTION as docCaption,A.DOCTYPE as docType,A.DOCDEP as docDep,A.DOCKEY as docKey,A.DOCDESC as docDesc,A.DOCDATE as docDate,A.DOCFILE as docFile,A.DOCNOVIEWS as docNoViews,A.DOCNODOWN as docNoDown from TBL_DOCUMENTS A where A.ID = (select min(id) from TBL_DOCUMENTS where id > '+ id+' )';

      con.query(qry,function(err,res){
  		
      if(err)
      {
          myErr=err;
          cb(myErr,data);
      }
      else
      {
          data=res;
          cb(myErr,data);
       }
   });

};

exports.getDocByDep=function(ser,depId,cb){

      var myErr=null,data=null;

      if(depId==null || depId=='') return cb("error",data);
      var qry="SELECT A.ID as id,A.DOCCAPTION as docCaption,A.DOCTYPE as docType,A.DOCDEP as docDep,A.DOCKEY as docKey,A.DOCDESC as docDesc,A.DOCDATE as docDate,A.DOCFILE as docFile,A.DOCNOVIEWS as docNoViews,A.DOCNODOWN as docNoDown,B.DEP_ID,B.DEP_NAME,COALESCE(FLOOR(AVG(C.STARS)),0) as star FROM TBL_DOCUMENTS A LEFT OUTER join TBL_DEPARTMENT B on (A.DOCDEP=B.DEP_ID) LEFT OUTER JOIN  TBL_DOC_STARS C  on  A.ID=C.DOC_ID WHERE A.DOCDEP="+depId+" AND A.DOCCAPTION LIKE '" + ser+ "%' GROUP BY C.doc_id,A.ID ORDER BY A.ID DESC";
      con.query(qry,depId,function(err,res){
  		
      if(err)
      {
          myErr=err;
          cb(myErr,data);
      }
      else
      {
          data=res;
          cb(myErr,data);
       }
   });

};

exports.getDocByType=function(ser,typeId,cb){

      var myErr=null,data=null;

     if(typeId==null || typeId=='') return cb("error",data);
      var qry="SELECT A.ID as id,A.DOCCAPTION as docCaption,A.DOCTYPE as docType,A.DOCDEP as docDep,A.DOCKEY as docKey,A.DOCDESC as docDesc,A.DOCDATE as docDate,A.DOCFILE as docFile,A.DOCNOVIEWS as docNoViews,A.DOCNODOWN as docNoDown,B.DEP_ID,B.DEP_NAME,COALESCE(FLOOR(AVG(C.STARS)),0) as star FROM TBL_DOCUMENTS A LEFT OUTER join TBL_DEPARTMENT B on (A.DOCDEP=B.DEP_ID) LEFT OUTER JOIN  TBL_DOC_STARS C  on  A.ID=C.DOC_ID WHERE A.DOCTYPE="+ typeId+" AND A.DOCCAPTION LIKE '" + ser+ "%' GROUP BY C.doc_id,A.ID ORDER BY A.ID DESC";
      con.query(qry,typeId,function(err,res){
  		
      if(err)
      {
          myErr=err;
          cb(myErr,data);
      }
      else
      {
          data=res;
          cb(myErr,data);
       }
   });

};

exports.getDocByTypeDep=function(ser,typeId,depId,cb){

      var myErr=null,data=null;
      if(typeId==null || typeId=='' || depId==null || depId=='' ) return cb("error",data);
      var qry="SELECT A.ID as id,A.DOCCAPTION as docCaption,A.DOCTYPE as docType,A.DOCDEP as docDep,A.DOCKEY as docKey,A.DOCDESC as docDesc,A.DOCDATE as docDate,A.DOCFILE as docFile,A.DOCNOVIEWS as docNoViews,A.DOCNODOWN as docNoDown,B.DEP_ID,B.DEP_NAME,COALESCE(FLOOR(AVG(C.STARS)),0) as star FROM TBL_DOCUMENTS A LEFT OUTER join TBL_DEPARTMENT B on (A.DOCDEP=B.DEP_ID) LEFT OUTER JOIN  TBL_DOC_STARS C  on  A.ID=C.DOC_ID WHERE A.DOCTYPE="+typeId+ " AND A.DOCDEP="+depId+" AND A.DOCCAPTION LIKE '" + ser+ "%' GROUP BY C.doc_id,A.ID ORDER BY A.ID DESC";
    
      con.query(qry,typeId,function(err,res){
  		
      if(err)
      {
          myErr=err;
          cb(myErr,data);
      }
      else
      {
          data=res;
          cb(myErr,data);
       }
   });

};

exports.incrViews=function(id,cb){

     var myErr=null,data=null;
     if(id==null || id=='') return cb("error",data);
      var qry='UPDATE TBL_DOCUMENTS SET DOCNOVIEWS = DOCNOVIEWS + 1 WHERE id ='+id;
      con.query(qry,function(err,res){
      cb(err,JSON.stringify(res));
      
   });
};

this.incrDown=function(id,cb){

    var myErr=null,data=null;
    if(id==null || id=='') return cb("error",data);
      var qry='UPDATE TBL_DOCUMENTS SET DOCNODOWN = DOCNODOWN + 1 WHERE id ='+id;
      con.query(qry,function(err,res){

      cb(err,JSON.stringify(res));

    });
};
