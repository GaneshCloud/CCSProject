

module.exports = function(app) {
    var grpCtrl = require('../controllers/sms.group.server.controller');

    app.post('/api/sms/createGroup',grpCtrl.createGroup);
    app.get('/api/sms/listGroup',grpCtrl.listGroup);
    app.delete('/api/sms/deleteGroup/:id',grpCtrl.deleteGroup);
    app.get('/api/sms/getMemberByGrpId/:id',grpCtrl.getMemberByGrpId);

};
