
module.exports = function(app) {
  var upload = require('../controllers/project.upload.server.controller.js');

  app.post('/upload', upload.upload);
};