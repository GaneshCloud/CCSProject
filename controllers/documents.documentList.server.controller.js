
var mysql = require('mysql'),
    db = require('../config/db'),
    serDocument = require('../config/db/documents/documentdb'),
    con = mysql.createConnection(db),
    docService = new serDocument(con);


exports.searchDocument = function(req,res) {
  var type = req.query.docType;
  var dep = req.query.dep;
  var serStr = req.query.serStr;
  var result;
  console.log(req.session.userMode);
  res.writeHead(200, {'Content-Type': 'application/json'});



  console.log('type:' + type + 'dep=' + dep);

  if (type === -1 && dep === -1)  {
    docService.getAllDoc(serStr,function(err,data) {
                result = data;
                console.log(data);
                res.end(JSON.stringify(result));
              });
  }  else if (type === -1)
                docService.getDocByDep(serStr,dep,function(err,data) {
                result = data;
                res.end(JSON.stringify(result));
              });
  else if (dep === -1)
              docService.getDocByType(serStr,type,function(err,data) {
                result = data;
                res.end(JSON.stringify(result));
              });
  else
              docService.getDocByTypeDep(serStr,type,dep,function(err,data) {
                result = data;
                res.end(JSON.stringify(result));
              });
};



exports.editDocument = function(req,res) {

  var id = req.query.id;
  docService.getDocById(id,function(err,data) {
    if (err) throw err;
    res.end(JSON.stringify(data));

  });
};


exports.deleteDocument = function(req,res) {
  var data = req.body;
  console.log(data);
  docService.deleteDoc(data,function() {
    console.log('Deleted Record....' + data);
    res.end();
  });
};





