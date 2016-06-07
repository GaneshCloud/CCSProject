module.exports = function(app) {
  var con = require('../controllers/project.projectReg.server.controller');
  app.get('/getdata',con.getData);
  app.post('/postdata',con.postData);
  app.post('/editdata',con.EditData);
  app.delete('/deletedata/:id',con.DeleteData);
};
