module.exports = function(app) {
  var main = require('../controllers/layout.server.controller.js');	//Layout page controller

  app.get('*', main.layout);
};