var path = require('path'),
    mysql = require('mysql'),
    fs = require('fs'),
    db = require('../config/db'),
    serDocument = require('../config/db/documents/documentdb'),
    serDepartment = require('../config/db/documents/departmentdb'),
    con = mysql.createConnection(db),
    docService = new serDocument(con),
    depServiceObj = new serDepartment(con);

var selectedFile,ext;

exports.upload = function(req,res) {

  var document = {};
  var datetime = new Date();
  // console.log("path:"+req.path);

  var formidable = require('formidable');
  var form = new formidable.IncomingForm();

  // console.log(req);

  form.parse(req, function(err, fields, files) {

    // console.log(files.docFile.name);
    selectedFile=files;
    ext = path.extname(files.docFile.name);
    document.docDate = datetime;
    document.docCaption = fields.docCaption;
    document.docType = fields.docType;
    document.docDep = fields.docDep;
    document.docKey = fields.docKey;
    document.docDesc = fields.docDesc;
    document.docFile = files.docFile.name;
    var insertId = null;

    if (fields.docId !== '')    {
      docService.updateDoc(fields.docId,document,manageFile);
    }else
      docService.insertDoc(document,manageFile);
      res.redirect('/documents/singleFileUpload');

  });
};

var manageFile=function(err,insId) {
  insertId = insId;
  fs.createReadStream(selectedFile.docFile.path).pipe(fs.createWriteStream(__dirname + '/../public/uploads/documents/' + selectedFile.docFile.name));
  fs.rename(__dirname + '/../public/uploads/documents/' + selectedFile.docFile.name, __dirname + '/../public/uploads/documents/' + insertId + ext, function(err) {
    if (err) throw err;
    //console.log(err);
  });
};
exports.getDepartment = function(req,res) {

  depServiceObj.getAllDep(function(err,data) {
            if (err) throw err;
            // console.log(data);
            res.end(JSON.stringify(data));

          });
};

