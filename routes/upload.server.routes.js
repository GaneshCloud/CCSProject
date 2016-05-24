'use strict';

module.exports = function(app) {
	var upload = require('../controllers/upload.server.controller');
	
	app.post('/upload', upload.upload);
};