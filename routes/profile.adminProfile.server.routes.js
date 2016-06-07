/**
 * Created by CSS on 25-05-2016.
 */


module.exports = function(app) {

  var controller = require('../controllers/profile.adminProfile.server.controller');

  app.get('/getUserDetails', controller.getUserDetails);

};