module.exports = function(app) {
  var forum = require('../controllers/forum.home.server.controller.js');
  app.use('/forum', forum);
};