'use strict';

var config = require('./config'),
	express = require('express'),
	morgan = require('morgan'),
	compress = require('compression'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	session = require('express-session');


module.exports = function() {
	var app = express();

	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));
	} else if (process.env.NODE_ENV === 'production') {
		app.use(compress());
	}
	
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	
	app.use(bodyParser.json());
	
	app.use(methodOverride());

	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret
	}));

	app.use(function(req, res, next) {
    	res.header("Access-Control-Allow-Origin", "http://localhost");
    	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    	next();
	});
	
	//app.set('views', './app/views');
	
	//app.set('view engine', 'ejs');
	app.use(express.static('./public'));
	
	//require('../routes/pageReload.server.routes.js')(app);
	require('../routes/project.home.server.routes.js')(app);
	require('../routes/project.upload.server.routes.js')(app);
	require('../routes/layout.server.routes.js')(app);

	//app.use(express.static('./public'));
	
	return app;
};