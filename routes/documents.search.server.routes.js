module.exports = function(app) {

  var searchCtrl = require('../controllers/documents.search.server.controller');
  app.get('/api/search',searchCtrl.searchDocument);


};
