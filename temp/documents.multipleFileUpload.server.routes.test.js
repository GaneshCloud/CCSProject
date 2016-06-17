/**
 * Created by Administrator on 6/15/2016.
 */


var expect  = require("chai").expect;
var sinon   = require("sinon");
var Document = require("../routes/documents.multipleFileUpload.server.routes.js");
var multiuploadCtrl = require('../controllers/documents.multipleFileUpload.server.controller.js');
var multiuploadCtrl={
    uploadMultiple:function(){
        return true
    }
};
var supertest = require('supertest');
var server;

describe("documentList routes",function(){
    before(function () {
        server = require('../server').server;
    });

    it('should call search once', function(done) {
        var uploadMultiple = sinon.spy(multiuploadCtrl, 'uploadMultiple');
        supertest(server).post('/uploadMulti');
        multiuploadCtrl.uploadMultiple();
        sinon.assert.calledOnce(uploadMultiple);
        done();

    });


});
