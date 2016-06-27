/**
 * Created by CSS on 25-05-2016.
 */

var personaldataManager = require('../config/db/personaldataManager');

var express = require('express');

var multer = require('multer');

var router = express.Router();


var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/profile');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        console.log("req.body"+req.body.file);
        cb(null, file.fieldname + '-' + file.originalname);

        var data = {
            file_name : file.fieldname + '-' + file.originalname,
            id : req.session.data.id
        };

        var userData = [];
        personaldataManager.getPersonalData(data.id).then(function (results) {
            if(results && results.length > 0){
                userData = results[0];
                userData.profile_pic = data.file_name;
                personaldataManager.updateImage(userData).then(function (result) {
                   if(result && result.length > 0){
                       userData = result[0];
                       req.session.data = userData;
                   }
                });
            }
        });
    }
});

var upload = multer({ //multer settings
    storage: storage
}).single('file');


router.get('/getPersonalData', function(req,res) {

    console.log("req"+req+"req.session"+JSON.stringify(req.session));

    console.log(req.session.authorization);

    if (req.session.passport) {
      req.session.data = [];

      req.session.data.id = req.session.passport.user[0].id;
    }

    personaldataManager.getPersonalData(req.session.data.id)
            .then(function(results) {
              if (results && results.length > 0) {
                req.session.data = results[0];
                res.send(results[0]);
              }
            },function (error) {
                res.send(500,{ error: error });
            });

});

router.post('/updatePersonalData', function(req,res) {
    personaldataManager.updatePersonalData(req.body)
            .then(function(results) {
              if (results) {
                res.send(results);
              }
            },function (error) {
                res.send(500,{ error: error });
            });
});

router.post('/uploadImage',function (req,res) {
    upload(req,res,function(results,error){
        if(error){
            res.send(500,{ error: error });
        }
        req.session.data = results;
        res.json({error_code:0,err_desc:null});
    });

    console.log("req--->"+req);
});



module.exports = router;