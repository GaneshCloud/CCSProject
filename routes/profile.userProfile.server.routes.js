/**
 * Created by CSS on 25-05-2016.
 */
/**
 * Created by CSS on 25-05-2016.
 */
'use strict';

module.exports = function(app) {
    var userProfile = require('../controllers/profile.userProfile.server.controller');
    // var layout = require('../controllers/project.layout.server.controller');

    // app.get('/', layout.layout);
    app.get('/getPersonalData',userProfile.getPersonalData);
    app.post('/updatePersonalData',userProfile.updatePersonalData);
    app.get('/connect/facebook',userProfile.connectFacebookAccount);
    app.get('/connect/facebook/callback',userProfile.connectFacebookCallback);
    app.get('/connect/google',userProfile.connectGoogleAccount);
    app.get('/connect/google/callback',userProfile.connectGoogleCallback);
};