/**
 * Created by CSS on 25-05-2016.
 */

module.exports = function(app) {
  var login = require('../controllers/profile.login.server.controller');
  // Var layout = require('../controllers/project.layout.server.controllers');

  //App.get('/', layout.layout);
  app.use('/auth',login);
  // App.post('/verifyUser',login.verifyUser);
  // app.get('/auth/facebook/callback',login.facebookCallback);

};