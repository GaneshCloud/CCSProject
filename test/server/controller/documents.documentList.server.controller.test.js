/**
 * Created by Administrator on 5/30/2016ss.
 */
var expect = require('chai').expect;
var controllerToTest = require('../../../controllers/documents.documentList.server.controller');
var documentService = require('../../../config/db/documents/documentdb');

describe('documentList Controller', function() {
    describe('delete Document', function() {
        it('returns the result', function(done) {
            var req = {
                body:{
                    ID: 5
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function() {
                    expect();
                    done();
                }
            };
            controllerToTest.deleteDocument(req,res); // call the function to be tested
        });

        it('returns the result', function(done) {
            var req = {
                body:{
                    ID: ''
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function(str) {
                    console.log(str);
                    done();
                }
            };
            controllerToTest.deleteDocument(req,res); // call the function to be tested
        });

        it('returns the result', function(done) {
            var req = {
                body:{
                    ID:null
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function(str) {
                    console.log(str);
                    done();
                }
            };
            controllerToTest.deleteDocument(req,res); // call the function to be tested
        });
        it('returns the result', function(done) {
            var req = {
                body:{
                    ID: 'abc'
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function(str) {
                    console.log(str);
                    done();
                }
            };
            controllerToTest.deleteDocument(req,res); // call the function to be tested
        });
    });

    describe('edit Document', function() {                                              //edit document
        it('returns the result', function(done) {
            var req = {
                query:{
                    id: 508
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function(data) {
                    expect(data).to.be.a("string");
                    done();
                }
            };
            controllerToTest.editDocument(req,res); // call the function to be tested
        });

        it('returns the result', function(done) {
            var req = {
                query:{
                    id: ''
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function(data) {

                    expect(data).to.be.equal('invalid');
                    expect(data).to.be.a('string');
                    done();
                }
            };
            controllerToTest.editDocument(req,res); // call the function to be tested
        });

        it('returns the result', function(done) {
            var req = {
                query:{
                    id:null
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function(data) {
                    expect(data).to.be.equal('invalid');
                    expect(data).to.be.a('string');
                    done();
                }
            };
            controllerToTest.editDocument(req,res); // call the function to be tested
        });
        it('returns the result', function(done) {
            var req = {
                query:{
                    id: 'abc'
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function(data) {
                    expect(data).to.be.equal('invalid');
                    expect(data).to.be.a('string');
                    done();
                }
            };
            controllerToTest.editDocument(req,res); // call the function to be tested
        });
    });

    describe('search Document', function() {                                              //search document
        it('returns the result', function(done) {
            var req = {
                query:{
                    docType: 2,
                    dep:4,
                    serStr:"a"
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function(data) {
                    expect(data).to.be.a("string");
                    done();
                },
                writeHead:function(){

                }
            };
            controllerToTest.searchDocument(req,res); // call the function to be tested
        });

        it('returns the result', function(done) {
            var req = {
                query:{
                    docType: -1,
                    dep:-1,
                    serStr:"a"
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function(data) {
                    expect(data).to.be.a("string");
                    done();
                },
                writeHead:function(){

                }
            };
            controllerToTest.searchDocument(req,res); // call the function to be tested
        });

        it('returns the result', function(done) {
            var req = {
                query:{
                    docType: 2,
                    dep:-1,
                    serStr:"a"
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function(data) {
                    expect(data).to.be.a("string");
                    done();
                },
                writeHead:function(){

                }
            };
            controllerToTest.searchDocument(req,res); // call the function to be tested
        });

        it('returns the result', function(done) {
            var req = {
                query:{
                    docType: -1,
                    dep:1,
                    serStr:"a"
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function(data) {
                    expect(data).to.be.a("string");
                    done();
                },
                writeHead:function(){

                }
            };
            controllerToTest.searchDocument(req,res); // call the function to be tested
        });//this

        it('returns the result', function(done) {
            var req = {
                query:{
                    docType: null,
                    dep: 6,
                    serStr:"a"
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function(data) {

                    expect(data).to.be.equal('invalid');
                    expect(data).to.be.a('string');
                    done();
                },
                writeHead:function(){

                }
            };
            controllerToTest.searchDocument(req,res); // call the function to be tested
        });

        it('returns the result', function(done) {
            var req = {
                query:{
                    docType: 2,
                    dep:'',
                    serStr:""
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function(data) {
                    expect(data).to.be.equal('invalid');
                    expect(data).to.be.a('string');
                    done();
                },
                writeHead:function(){

                }
            };
            controllerToTest.searchDocument(req,res); // call the function to be tested
        });
        it('returns the result', function(done) {
            var req = {
                query:{
                    docType: 'abc',
                    dep:4,
                    serStr:"a"
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function(data) {
                    expect(data).to.be.equal('invalid');
                    expect(data).to.be.a('string');
                    done();
                },
                writeHead:function(){

                }
            };
            controllerToTest.searchDocument(req,res); // call the function to be tested
        });
    });
});
