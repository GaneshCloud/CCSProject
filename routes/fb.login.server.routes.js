

module.exports = function(app) {
    var fbLoginCtrl = require('../controllers/fb.login.server.controller.js');

    app.post('/api/fb/login',fbLoginCtrl.fbLogin);
    app.get('/api/fb/getFriendsList',fbLoginCtrl.fbLogin,fbLoginCtrl.getFriendsList);
    app.post('/api/fb/sendMessage',fbLoginCtrl.fbLogin,fbLoginCtrl.sendMessage);
    app.post('/api/fb/fileUpload',fbLoginCtrl.fileUpload);
    app.get('/api/fb/getMessageById',fbLoginCtrl.getMessageById);
    app.get('/api/fb/getFbMessages',fbLoginCtrl.getFbMessages);
    
};
