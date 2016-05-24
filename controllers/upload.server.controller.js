'use strict';

var multer=require('multer'),
	event=require('events'),
	mysql= require('mysql'),
    db = require('../config/db');

var connection=mysql.createConnection(db);


var EventEmitter = event.EventEmitter;

var emitter=new EventEmitter();

exports.upload=function(req,res){
	var storage = multer.diskStorage({ //multers disk storage settings
	    destination: function (req, file, cb) {
	        cb(null, './public/images/uploads/');
	    },
	    filename: function (req, file, cb) {
	        //var datetimestamp = Date.now();
	        //cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
	        cb(null, 'CB2-1516-CSD0001' + '.'+file.originalname);
	        emitter.emit('image-upload','CB2-1516-CSD0001' + '.' + file.originalname);

	    }
	});

	var upload = multer({ //multer settings
	    storage: storage
	}).single('file');


	    upload(req,res,function(err){
	        if(err){
	        	console.log(err);
	            res.json({errorCode:1,errDesc:err});
	            return;
	        }
	        res.json({errorCode:0,errDesc:null});
	    });
	       

	emitter.on('image-upload', function(file){

	    console.log('Image upload begin...');
	    
	    connection.query("Insert into images values('"+file+"')",function(err,result){
	        if(err){
	            console.log('Error when upload image fileName : '+err);
	        }else{
	            console.log(result);
	            return;
	        }
	    });

	});
};
