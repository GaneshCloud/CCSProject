module.exports = function(app) {

  var starCtrl = require('../controllers/documents.star.server.controller');
  app.get('/api/getStar',starCtrl.getStar);
  app.post('/api/setStar',starCtrl.setStar);
  app.get('/getRatingInfo',starCtrl.getRatingInfo);

};
