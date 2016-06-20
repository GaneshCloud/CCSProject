var path = require('path'),
     mysql = require('mysql'),
    fs = require('fs'),
    db = require('../config/db'),
    serDocument = require('../config/db/documents/documentdb'),
    con = mysql.createConnection(db),
    docService = new serDocument(con);



exports.uploadMultiple = function(req,res) {
  var document = {};
  var datetime = new Date();

  // console.log(req.path);

  var formidable = require('formidable');
  // console.log(req.body);
  var sync = false;
  var insertCallback = function () {
  };
  var insertId = null;
  var i = 0;
  var ext;
  insertCallback = function (err, insId) {
    insertId = insId;
    // console.log('i: ' + i);
    fs.createReadStream(files1['docFile' + i].path).pipe(fs.createWriteStream(__dirname + '/../public/uploads/documents/' + files1['docFile' + i].name));
    fs.rename(__dirname + '/../public/uploads/documents/' + files1['docFile' + i].name, __dirname + '/../public/uploads/documents/' + insertId + ext, function (err) {
      if (err) throw err;
      console.log(err);

      sync = true;
    });
  };


  var form = new formidable.IncomingForm(),
      files1 = {},
      fields = {};
  


  form.parse(req, function (err, fields, files) {

    if(err) throw err;
    for (i = 1; i <= Object.keys(files).length; i++) {
      files1=files;
      sync = false;
      ext = path.extname(files['docFile' + i].name);
      // console.log(fields["docCaption"+i]);
      document.docDate = datetime;
      document.docCaption = fields['docCaption'+i];
      document.docType = fields['docType' + i];
      document.docDep = fields['docDep' + i];
      document.docKey = fields['docKey' + i];
      document.docDesc = fields['docDesc' + i];
      document.docFile = files['docFile' + i].name;


      // console.log(document);

      docService.insertDoc(document, insertCallback);
      while (!sync) {
        require('deasync').sleep(1000);
      }

    }


    res.redirect('/documents/multipleFileUpload');
  });
};

