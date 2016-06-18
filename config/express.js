
var config = require('./config'),
	express = require('express'),
	morgan = require('morgan'),
	compress = require('compression'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	passport = require('passport'),
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
    	res.header('Access-Control-Allow-Origin', 'http://localhost');
    	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    	next();
  });

  var store = new session.MemoryStore();

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(session({ secret: 'something', store: store }));

  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000/auth/facebook');
    next();
  });

  app.use(express.static('./public'));

  require('../routes/project.home.server.routes.js')(app);
  require('../routes/profile.login.server.routes.js')(app);
  require('../routes/profile.userProfile.server.routes.js')(app);
  require('../routes/profile.adminProfile.server.routes.js')(app);
  require('../routes/profile.logout.server.routes')(app);
  require('../routes/forum.home.server.routes.js')(app);
  require('../routes/documents.documentList.server.routes')(app);
  require('../routes/documents.singleFileUpload.server.routes')(app);
  require('../routes/documents.multipleFileUpload.server.routes')(app);
  require('../routes/documents.star.server.routes')(app);
  require('../routes/documents.viewDocument.server.routes')(app);
  require('../routes/documents.search.server.routes')(app);
  require('../routes/project.projectReg.server.route')(app);



  require('../routes/security.server.routes.js')(app);
  require('../routes/layout.server.routes.js')(app);	//Layout page route

  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });

  return app;
};