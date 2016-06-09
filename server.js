process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('./config/express');

var app = express();

var server = app.listen(3000, function () {
    var port = server.address().port;
    console.log('Server running at %s', port);
});

module.exports = app;
