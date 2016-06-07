module.exports = function(con){

this.getAllDep = function (cb){
  
      var result=null,myErr=null;

      con.query('select * from tbl_department',  function(err,rows){    
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
      con.query('select * from tbl_department WHERE DEP_ID='+id,  function(err,rows){    
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