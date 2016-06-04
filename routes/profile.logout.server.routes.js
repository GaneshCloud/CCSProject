/**
 * Created by CSS on 25-05-2016.
 */
/**
 * Created by CSS on 25-05-2016.
 */


module.exports = function(app) {

  var controller = require('../controllers/profile.logout.server.controller');

  app.get('/logout', controller.logout);

};