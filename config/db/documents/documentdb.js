module.exports = function(con){

//var techDocument=require("../models/document");


this.insertDoc=function(data,cb){

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



this.getAllDoc=function(ser,cb){

      var myErr=null,data=null;
      var qry="SELECT A.*,B.*,COALESCE(FLOOR(AVG(C.STARS)),0) as star FROM TBL_DOCUMENTS A LEFT OUTER join TBL_DEPARTMENT B on (A.DOCDEP=B.DEP_ID) LEFT OUTER JOIN  TBL_DOC_STARS C  on  A.ID=C.DOC_ID WHERE A.DOCCAPTION LIKE '" + ser+ "%' GROUP BY A.id";
      console.log(qry);
      con.query(qry,function(err,res){

      if(err)
      {
          myErr=err;
          cb(myErr,data);
      }
      else
      {
          console.log(res);
          data=res;
          cb(myErr,data);
       }
   });
};

this.updateDoc=function(id,uData,cb){

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

this.deleteDoc=function(id,cb){

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

this.getDocById=function(id,cb){

      var myErr=null,data=null;
      var qry="SELECT  * FROM TBL_DOCUMENTS WHERE ID="+id;
      if( id===null || id==='') return cb("error",data);
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

this.getDocByDep=function(ser,depId,cb){

      var myErr=null,data=null;

      if(depId==null || depId=='') return cb("error",data);
      var qry="SELECT A.*,B.*,COALESCE(FLOOR(AVG(C.STARS)),0) as star FROM TBL_DOCUMENTS A LEFT OUTER join TBL_DEPARTMENT B on (A.DOCDEP=B.DEP_ID) LEFT OUTER JOIN  TBL_DOC_STARS C  on  A.ID=C.DOC_ID WHERE A.DOCDEP="+depId+" AND A.DOCCAPTION LIKE '" + ser+ "%' GROUP BY C.doc_id,A.ID";
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

this.getDocByType=function(ser,typeId,cb){

      var myErr=null,data=null;

     if(typeId==null || typeId=='') return cb("error",data);
      var qry="SELECT A.*,B.*,COALESCE(FLOOR(AVG(C.STARS)),0) as star FROM TBL_DOCUMENTS A LEFT OUTER join TBL_DEPARTMENT B on (A.DOCDEP=B.DEP_ID) LEFT OUTER JOIN  TBL_DOC_STARS C  on  A.ID=C.DOC_ID WHERE A.DOCTYPE="+ typeId+" AND A.DOCCAPTION LIKE '" + ser+ "%' GROUP BY C.doc_id,A.ID";
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

this.getDocByTypeDep=function(ser,typeId,depId,cb){

      var myErr=null,data=null;
      if(typeId==null || typeId=='' || depId==null || depId=='' ) return cb("error",data);
      var qry="SELECT A.*,B.*,COALESCE(FLOOR(AVG(C.STARS)),0) as star FROM TBL_DOCUMENTS A LEFT OUTER join TBL_DEPARTMENT B on (A.DOCDEP=B.DEP_ID) LEFT OUTER JOIN  TBL_DOC_STARS C  on  A.ID=C.DOC_ID WHERE A.DOCTYPE="+typeId+ " AND A.DOCDEP="+depId+" AND A.DOCCAPTION LIKE '" + ser+ "%' GROUP BY C.doc_id,A.ID";
      console.log(qry);
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

this.incrViews=function(id,cb){

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


/*this.getLatestDoc=function(depId,cb){

      var myErr=null,result=null;
      var qry='select * from tbl_documents where DOCDEP='+depId+' ORDER BY ID  DESC LIMIT 5';

      con.query(qry,function(err,res){

      if(err)
      {
          myErr=err;
          cb(myErr,result);
      }
      else
      {
          result=res;
          cb(myErr,result);
       }
   });

};

this.getLatestVid=function(id,cb){

      var myErr=null,result=null;
      var qry='select * from tbl_documents where doctype='+id+' ORDER BY ID  DESC LIMIT 2';

      con.query(qry,function(err,res){

      if(err)
      {
          myErr=err;
          cb(myErr,result);
      }
      else
      {
          result=res;
          cb(myErr,result);
       }
   });

};

this.getLatestImg=function(id,cb){

      var myErr=null,result=null;
      var qry='select a.*,b.*,substring_index(a.docfile,".",-1) as type from tbl_documents a inner join tbl_department b on a.docdep=b.dep_id where doctype='+id+' ORDER BY ID  DESC LIMIT 4';
      con.query(qry,function(err,res){
  		
      if(err)
      {
          myErr=err;
          cb(myErr,result);
      }
      else
      {
          result=res;
          cb(myErr,result);
       }
   });

};


this.getLatestArchives=function(id,cb){

      var myErr=null,result=null;
      var qry='select a.*,b.*,substring_index(a.docfile,".",-1) as type from tbl_documents a inner join tbl_department b on a.docdep=b.dep_id where doctype='+id+' ORDER BY ID  DESC LIMIT 4';
      
      con.query(qry,function(err,res){
      
      if(err)
      {
          myErr=err;
          cb(myErr,result);
      }
      else
      {
          result=res;
          cb(myErr,result);
       }
   });
};
*/

this.getNextDocument=function(id,cb){

      var myErr=null,result=null;
      var myErr=null,data=null;
      if(id==null || id=='') return cb("error",data);
      var qry='select * from TBL_DOCUMENTS where id = (select min(id) from TBL_DOCUMENTS where id > '+ id+' )';

      // con.query(qry,function(err,res){
      //
      // // if(err) throw err;
      // //
      // // else
      // //     console.log(res);
      // //
      // // });
   
   con.query(qry,function(err,res){
      
      if(err)
      {
          myErr=err;
          cb(myErr,result);
      }
      else
      {
          result=res;
          cb(myErr,result);
       }
   });
};


this.getPrevDocument=function(id,cb){

      var myErr=null,result=null;
      var myErr=null,data=null;
      if(id==null || id=='') return cb("error",data);
      var qry='select * from TBL_DOCUMENTS where id = (select max(id) from TBL_DOCUMENTS where id < '+ id+' )';

    //   con.query(qry,function(err,res){
    //
    //   if(err) throw err;
    //   else
    //       console.log(res);
    //
    // });

      con.query(qry,function(err,res){
      
      if(err)
      {
          myErr=err;
          cb(myErr,result);
      }
      else
      {
          result=res;
          cb(myErr,result);
       }
   });
};

};
