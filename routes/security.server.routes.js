'use strict';

module.exports = function(app) {
    var security = require('../controllers/security.server.controller');

    app.get('/getLoggedInUser', security.getLoggedInUser);
};