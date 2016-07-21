

var fs=require('fs');
var path=require("path");
var login = require("facebook-chat-api");
var fbDb=require('../config/db/fb/fbDb');
exports.fbLogin=function(req,res,next){

    // var id=req.body.id;
    // var pass=req.body.pass;
    //

    login({email: '9566494491', password: 'yoosu147258'}, function callback (err, api) {
        if (err)
            return res.json(err);
        else
        {
            req.fbApi=api;
            next();
        }

    });

};


exports.getFriendsList=function(req,res){
        req.fbApi.getFriendsList(function (err, data) {
            if (err)
                return console.error(err);
            else
                res.json(data)
        });
};

exports.sendMessage=function(req,res){

    var userId=req.body.id.slice();
    var msg=req.body.msg;

    fbDb.svaFbMessage({fbId:userId,msg:msg,attach:''},function(err,insId){
        if(err)
            res.send(err);
        else
        {
            // req.fbApi.sendMessage(msg, userId,function(err,msgInfo){
            //     if(err)
            //         console.log(err);
            //     else{
            //         res.json(msgInfo);
            //     }
            //
            // });
            res.end();
        }

    });


};



exports.fileUpload=function(req,res) {

    var formidable = require('formidable');
    var form = new formidable.IncomingForm();
    var selectedFile, userId=[];
    // userId=req.body.id.slice();

    form.parse(req, function (err, fields, files) {
        selectedFile = files.file;
        userId = fields.userId.split(',');
        // console.log(fields.userId);
        // if(selectedFrnd===undefined) return;
        fbDb.svaFbMessage({fbId: userId, msg: '', attach: selectedFile.name}, function (err, insId) {
            if (err)
                res.send(err);
            else {
                var ext = path.extname(selectedFile.name);
                fs.createReadStream(selectedFile.path).pipe(fs.createWriteStream(__dirname + '/../public/uploads/fb/' + selectedFile.name));
                fs.rename(__dirname + '/../public/uploads/fb/' + selectedFile.name, __dirname + '/../public/uploads/fb/' + insId.insertId + ext, function(err) {
                    if (err) {
                        console.log(err);
                        res.end();
                    }
                    else
                    {
                        // login({email: "9566494491", password: "yoosu147258"}, function callback(err, api) {
                        //     if (err) return console.error(err);
                        //     var msg = {
                        //
                        //         attachment: fs.createReadStream(__dirname + '/../public/uploads/fb/' + insId.insertId+ ext)
                        //     };
                        //     api.sendMessage(msg, userId, function (err, msgInfo) {
                        //         if (err) console.log(err);
                        //         else{
                        //             // res.data.insId=insId.insertId;
                        //             // res.send('success');
                        //             res.json(insId);
                        //         }
                        //
                        //     });
                        //
                        // });
                    }
                    //console.log(err);
                });

            }
        });


    });
};

exports.getMessageById=function(req,res){

    fbDb.getMessageById(req.query.id, function (err, result) {

        if(err)
            res.send(err);
        else
            res.json(result);
    });
};

exports.getFbMessages=function(req,res){

    fbDb.getMessages(function (err, result) {

        if(err)
            res.send(err);
        else
            res.json(result);
    });
};

// var passport=require('passport');
// var FacebookTokenStrategy = require('passport-facebook-token');
//
//
// passport.use(new FacebookTokenStrategy({
//         clientID: '871836919584397',
//         clientSecret: '814689930a7e2df7a613e6b8790a2fd0'
//     }, function(accessToken, refreshToken, profile, done) {
//         var user = {
//             'email': profile.emails[0].value,
//             'name' : profile.name.givenName + ' ' + profile.name.familyName,
//             'id'   : profile.id,
//             'token': accessToken
//         };
//
//         // console.log(user);
//         return done(error, user);
//
//
//         //
//     }
//
// ));

// exports.token=function(reqs,res){
//
//     // passport.authenticate(['facebook-token','other-strategies']),
//     //     function (req, res) {
//     //         console.log(req);
//     //         if (req.user){
//     //             //you're authenticated! return sensitive secret information here.
//     //             console.log(req.user);
//     //             res.send(200, {'secrets':['array','of','top','secret','information']});
//     //         } else {
//     //             // not authenticated. go away.
//     //             console.log("errrrrro");
//     //             res.send(401)
//     //         }
//     //
//     //     };
//
//     https.get("https://graph.facebook.com/oauth/access_token?" +
//         "client_id={871836919584397}" +
//         "&redirect_uri=" +
//         "&client_secret={814689930a7e2df7a613e6b8790a2fd0}" +
//         "&code=" + code,
//         function(res)
//         {
//             res.on('data', function(chunk) {
//                 console.log(chunk);
//             });
//         }
//     )
// }
