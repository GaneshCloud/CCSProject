module.exports = function(app) {

  var documentManagerCtrl = require('../controllers/documents.documentManager.server.controller.js');

  app.get('/api/search',documentManagerCtrl.searchDocument);
  app.get('/api/docs/getDoc',documentManagerCtrl.getDocument);
  app.post('/api/docs/delete',documentManagerCtrl.deleteDocument);
};
