



var expect  = require("chai").expect;
var sinon   = require("sinon");
var Document = require("../routes/documents.multipleFileUpload.server.routes.js");
var viewDocumentCtrl = require('../controllers/documents.viewDocument.server.controller.js');

var viewDocumentCtrl={
    readZip:function(){
        return true
    },
    downloadDocument:function(){
        return true
    },
    viewDocument:function(){
        return true
    },
    nextDocument:function(){
        return true
    },
    prevDocument:function(){
        return true
    },
    userMode:function(){
        return true
    }
};
var supertest = require('supertest');
var server;

describe("star routes",function(){
    before(function () {
        server = require('../server').server;
    });

    it('should readZip once', function(done) {
        var readZip = sinon.spy(viewDocumentCtrl, 'readZip');
        supertest(server).get('/readZip');
        viewDocumentCtrl.readZip();
        sinon.assert.calledOnce(readZip);
        done();

    });

    it('should downloadDocument once', function(done) {
        var downloadDocument = sinon.spy(viewDocumentCtrl, 'downloadDocument');
        supertest(server).get('/api/download');
        viewDocumentCtrl.downloadDocument();
        sinon.assert.calledOnce(downloadDocument);
        done();

    });

    it('should viewDocument once', function(done) {
        var viewDocument = sinon.spy(viewDocumentCtrl, 'viewDocument');
        supertest(server).get('/viewDocument');
        viewDocumentCtrl.viewDocument();
        sinon.assert.calledOnce(viewDocument);
        done();

    });

    it('should viewDocument once', function(done) {
        var nextDocument = sinon.spy(viewDocumentCtrl, 'nextDocument');
        supertest(server).get('/nextDoc');
        viewDocumentCtrl.nextDocument();
        sinon.assert.calledOnce(nextDocument);
        done();

    });

    it('should prevDocument once', function(done) {
        var prevDocument = sinon.spy(viewDocumentCtrl, 'prevDocument');
        supertest(server).get('/prevDoc');
        viewDocumentCtrl.prevDocument();
        sinon.assert.calledOnce(prevDocument);
        done();

    });

    it('should userMode once', function(done) {
        var userMode = sinon.spy(viewDocumentCtrl, 'userMode');
        supertest(server).get('/mode');
        viewDocumentCtrl.userMode();
        sinon.assert.calledOnce(userMode);
        done();

    });


});

