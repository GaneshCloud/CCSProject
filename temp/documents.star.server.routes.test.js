



var expect  = require("chai").expect;
var sinon   = require("sinon");
var Document = require("../routes/documents.multipleFileUpload.server.routes.js");
var starCtrl = require('../controllers/documents.star.server.controller.js');

var starCtrl={
    getStar:function(){
        return true
    },
    setStar:function(){

    },
    getRatingInfo:function(){

    }
};
var supertest = require('supertest');
var server;

describe("star routes",function(){
    before(function () {
        server = require('../server').server;
    });

    it('should call search once', function(done) {
        var getStar = sinon.spy(starCtrl, 'getStar');
        supertest(server).get('/api/getStar');
        starCtrl.getStar();
        sinon.assert.calledOnce(getStar);
        done();

    });
    it('should set star call once', function(done) {
        var setStar = sinon.spy(starCtrl, 'setStar');
        supertest(server).get('/api/setStar');
        starCtrl.setStar();
        sinon.assert.calledOnce(setStar);
        done();

    });
    it('should get starInfo call once', function(done) {
        var getRatingInfo = sinon.spy(starCtrl, 'getRatingInfo');
        supertest(server).get('/getRatingInfo');
        starCtrl.getRatingInfo();
        sinon.assert.calledOnce(getRatingInfo);
        done();

    });


});

