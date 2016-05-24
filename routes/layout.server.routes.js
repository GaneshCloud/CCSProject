'use strict';

module.exports=function(app){
	var main=require('../controllers/layout.server.controller.js');

	app.get('*', main.layout);
	//app.get('/home', reload.pageReload);
	//app.get('/upload',reload.pageReload);
};