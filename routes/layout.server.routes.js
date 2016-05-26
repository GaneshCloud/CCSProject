'use strict';

module.exports=function(app){
	var main=require('../controllers/layout.server.controller.js');	//layout page controller

	app.get('*', main.layout);
};