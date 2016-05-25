/**
 * Created by CSS on 25-05-2016.
 */
'use strict';

module.exports = function(app) {
    var login = require('../controllers/profile.login.server.controller');
    // var layout = require('../controllers/project.layout.server.controller');

    //app.get('/', layout.layout);
    app.use('/auth',login);
    // app.post('/verifyUser',login.verifyUser);
    // app.get('/auth/facebook/callback',login.facebookCallback);
    
};