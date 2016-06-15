module.exports = function(con){

this.getAllDep = function (cb){
  
      var result=null,myErr=null;

      con.query('select d.DEP_ID,d.DEP_NAME from tbl_department d',  function(err,rows){
          if(err)
          {
              myErr=err;
              cb( myErr,result);
          }
          else
          {
              result=rows;
              cb( myErr,result);
          }

      });

};

this.getDepById = function (id,cb){
  
      var result=null,myErr=null;
      if(id==null || id=='') return cb("error",result);
      con.query('select d.DEP_ID,d.DEP_NAME from tbl_department d WHERE d.DEP_ID='+id,  function(err,rows){
          if(err)
          {
              myErr=err;
              cb( myErr,result);
          }
          else
          {
              result=rows;
              cb(myErr,result);
          }
          
        });
 };


};