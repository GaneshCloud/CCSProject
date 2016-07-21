

module.exports = function(app) {
    var memCtrl = require('../controllers/sms.member.server.controller');

    app.post('/api/sms/createMember',memCtrl.createMember);
    app.get('/api/sms/listMember',memCtrl.listMember);
    app.delete('/api/sms/deleteMember/:id',memCtrl.deleteMember);
    app.delete('/api/sms/removeFromGroup/:id',memCtrl.removeFromGroup);

};
