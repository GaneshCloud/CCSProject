module.exports = function(app) {
    var chat = require('../controllers/chat.home.server.controller.js');
    app.post('/chat/sendimage',chat.image);
    app.post('/chat/sendFile',chat.Files);
    app.get('/chat/getChatInfo',chat.chatInfo);
    app.get('/chat/getReadInfo',chat.getchat);
    app.post('/chat/msgReadInfo',chat.msgReadInfo);
    
  //  app.get('/', chat.home);

};