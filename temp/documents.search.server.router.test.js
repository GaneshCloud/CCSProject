/**
 * Created by Administrator on 6/14/2016.
 */

var expect  = require("chai").expect;
var sinon   = require("sinon");
var Document = require("../routes/documents.search.server.routes.js");
var searchCtrl = require('../controllers/documents.search.server.controller.js');
var searchCtrl={
    searchDocument:function(){
        return true
    }
};
var supertest = require('supertest');
var server;

describe("search routes",function(){
    before(function () {
        server = require('../server').server;
    });

    it('should call search once', function(done) {
        var searchDocument = sinon.spy(searchCtrl, 'searchDocument');
        supertest(server).get('/api/search');
        searchCtrl.searchDocument();
        sinon.assert.calledOnce(searchDocument);
        done();

    });


});
