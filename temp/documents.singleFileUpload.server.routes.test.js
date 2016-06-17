/**
 * Created by Administrator on 6/15/2016.
 */



var expect  = require("chai").expect;
var sinon   = require("sinon");
var Document = require("../routes/documents.multipleFileUpload.server.routes.js");
var singluploadCtrl = require('../controllers/documents.singleFileUpload.server.controller.js');

var singluploadCtrl={
    upload:function(){
        return true
    },
    getDepartment:function(){

    }
};
var supertest = require('supertest');
var server;

describe("single file upload routes",function(){
    before(function () {
        server = require('../server').server;
    });

    it('should call search once', function(done) {
        var upload = sinon.spy(singluploadCtrl, 'upload');
        supertest(server).post('/documents/upload');
        singluploadCtrl.upload();
        sinon.assert.calledOnce(upload);
        done();

    });
    it('should get department call once', function(done) {
        var getDepartment = sinon.spy(singluploadCtrl, 'getDepartment');
        supertest(server).get('/api/dep');
        singluploadCtrl.getDepartment();
        sinon.assert.calledOnce(getDepartment);
        done();

    });


});

