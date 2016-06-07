/**
 * Created by CSS on 25-05-2016.
 */
/**
 * Created by CSS on 25-05-2016.
 */

module.exports = function(app) {
  var userProfile = require('../controllers/profile.userProfile.server.controller');
  // Var layout = require('../controllers/project.layout.server.controller');

  // App.get('/', layout.layout);
  app.use('/connect',userProfile);
  // App.get('/getPersonalData',userProfile.getPersonalData);
  // app.post('/updatePersonalData',userProfile.updatePersonalData);
  // app.get('/connect/facebook',userProfile.connectFacebookAccount);
  // app.get('/connect/facebook/callback',userProfile.connectFacebookCallback);
  // app.get('/connect/google',userProfile.connectGoogleAccount);
  // app.get('/connect/google/callback',userProfile.connectGoogleCallback);
};