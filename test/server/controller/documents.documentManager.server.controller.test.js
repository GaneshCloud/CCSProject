/**
 * Created by Administrator on 5/30/2016ss.
 */

var expect = require('chai').expect;
var controllerToTest = require('../../../controllers/documents.documentManager.server.controller.js');
var docService=require('../../../config/db/documents/documentdb');
var sinon = require('sinon');
var error = new Error('some error occured');

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
                    ID: "'"
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

    describe('get Document', function() {                                              //edit document
        it('returns the result', function(done) {
            var req = {
                query:{
                    id: 508
                }
            };
            // we provide the response object which the controller uses
            var res = {
                json: function(data) {
                    expect(data).to.be.an("array");
                    done();
                },
                end:function(data){

                }
            };
            controllerToTest.getDocument(req,res); // call the function to be tested
        });

        it('returns the result', function(done) {
            var stub=sinon.stub(docService,"getDocById");
            var req = {
                query:{
                    id: 508
                }
            };
            // we provide the response object which the controller uses
            var res = {
                json: function(data) {
                    expect(data).to.be.an("object");
                    stub.restore();
                    done();
                },
                end:function(data){

                }
            };
            stub.callsArgWithAsync(2,error,null);
            controllerToTest.getDocument(req,res); // call the function to be tested
        });

        it('returns the result', function(done) {
            var stub=sinon.stub(docService,"getDocById");
            var req = {
                query:{
                    id: ''
                }
            };
            // we provide the response object which the controller uses
            var res = {
                json: function(data) {


                },end:function(data){
                    expect(data).to.be.equal('invalid');
                    expect(data).to.be.a('string');
                    stub.restore();
                    done();
                }
            };
            stub.callsArgWithAsync(2,null,[]);
            controllerToTest.getDocument(req,res); // call the function to be tested
        });

        it('returns the result', function(done) {
            var stub=sinon.stub(docService,"getDocById");
            var req = {
                query:{
                    id:null
                }
            };
            // we provide the response object which the controller uses
            var res = {
                json: function(data) {

                },end:function(data){
                    expect(data).to.be.equal('invalid');
                    expect(data).to.be.a('string');
                    stub.restore();
                    done();
                }
            };
            stub.callsArgWithAsync(2,null,[]);
            controllerToTest.getDocument(req,res); // call the function to be tested
        });
        it('returns the result', function(done) {
            var stub=sinon.stub(docService,"getDocById");
            var req = {
                query:{
                    id: 'abc'
                }
            };
            // we provide the response object which the controller uses
            var res = {
                json: function(data) {

                },end:function(data){
                    expect(data).to.be.equal('invalid');
                    expect(data).to.be.a('string');
                    stub.restore();
                    done();
                }
            };
            stub.callsArgWithAsync(2,null,[]);
            controllerToTest.getDocument(req,res); // call the function to be tested
        });

        it('returns the result', function(done) {
            var stub=sinon.stub(docService,"getDocById");
            var req = {
                query:{
                    id: '502'
                }
            };
            // we provide the response object which the controller uses
            var res = {
                json: function(data) {
                    expect(data[0].isFileExist).to.be.false;
                    stub.restore();
                    done();
                },end:function(data){

                }
            };
            stub.callsArgWithAsync(2,null,[{id:2,docCaption:'sample1',docFile:"2"}]);
            controllerToTest.getDocument(req,res); // call the function to be tested
        });
        it('returns the result', function(done) {
            var stub=sinon.stub(docService,"getDocById");
            var req = {
                query:{
                    id: '506'
                }
            };
            // we provide the response object which the controller uses
            var res = {
                json: function(data) {
                    expect(data[0].isFileExist).to.be.true;
                    stub.restore();
                    done();
                },end:function(data){

                }
            };
            stub.callsArgWithAsync(2,null,[{ID:506,docCaption:'sample1',docFile:"ss.zip"}]);
            controllerToTest.getDocument(req,res); // call the function to be tested
        });

        it('returns the result', function(done) {
            var stub=sinon.stub(docService,"getDocById");
            var req = {
                query:{
                    id: '502'
                }
            };
            // we provide the response object which the controller uses
            var res = {
                json: function(data) {

                },end:function(data){
                    expect(data).to.be.equal('invalid');
                    expect(data).to.be.a('string');
                    stub.restore();
                    done();
                }
            };
            stub.callsArgWithAsync(2,null,[]);
            controllerToTest.getDocument(req,res); // call the function to be tested
        });

    });

    describe('search Document', function() {//search document

        it('returns the result', function(done) {
           var stub = sinon.stub(docService, 'getDocByTypeDep');
            var req = {
                query:{
                    docType: '2',
                    dep:'4',
                    serStr:"a"
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function(data) {
                    expect(data).to.be.an("object");
                    stub.restore();
                    done();
                },
                writeHead:function(){

                }
            };
            var error = new Error('some error occured');
                stub.callsArgWithAsync(3,error,null);
                controllerToTest.searchDocument(req,res); // call the function to be tested

        });

        it('returns the result', function(done) {
            var stub = sinon.stub(docService, 'getDocByTypeDep');
            var req = {
                query:{
                    docType: '2',
                    dep:'4',
                    serStr:"a"
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function(data) {
                    expect(data).to.be.a("string");
                    stub.restore();
                    done();
                },
                writeHead:function(){

                }
            };
            stub.callsArgWithAsync(3,null,{id:1,docCaption:"sample1"});
            controllerToTest.searchDocument(req,res); // call the function to be tested

        });

        it('returns the result', function(done) {
            var stub = sinon.stub(docService, 'getAllDoc');
            var req = {
                query:{
                    docType: '-1',
                    dep:'-1',
                    serStr:"a"
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function(data) {
                    expect(data).to.be.an("object");
                    stub.restore();
                    done();
                },
                writeHead:function(){

                }
            };

            stub.callsArgWithAsync(1,error,null);
            controllerToTest.searchDocument(req,res); // call the function to be tested
        });

        it('returns the result', function(done) {
            var stub = sinon.stub(docService, 'getAllDoc');
            var req = {
                query:{
                    docType: '-1',
                    dep:'-1',
                    serStr:"a"
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function(data) {
                    expect(data).to.be.a("string");
                    stub.restore();
                    done();
                },
                writeHead:function(){

                }
            };

            stub.callsArgWithAsync(1,null,{id:1,docCaption:"sample1"});
            controllerToTest.searchDocument(req,res); // call the function to be tested
        });

        it('returns the result', function(done) {
            var stub = sinon.stub(docService, 'getDocByType');
            var req = {
                query:{
                    docType: '2',
                    dep:'-1',
                    serStr:"a"
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function(data) {
                    expect(data).to.be.an("object");
                    stub.restore();
                    done();
                },
                writeHead:function(){

                }
            };
            stub.callsArgWithAsync(2,error,null);
            controllerToTest.searchDocument(req,res); // call the function to be tested
        });

        it('returns the result', function(done) {
            var stub = sinon.stub(docService, 'getDocByType');
            var req = {
                query:{
                    docType: '2',
                    dep:'-1',
                    serStr:"a"
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function(data) {
                    expect(data).to.be.a("string");
                    stub.restore();
                    done();
                },
                writeHead:function(){

                }
            };
            stub.callsArgWithAsync(2,null,{id:1,docCaption:"sample1"});
            controllerToTest.searchDocument(req,res); // call the function to be tested
        });


        it('returns the result', function(done) {
            var stub = sinon.stub(docService, 'getDocByDep');
            var req = {
                query:{
                    docType: '-1',
                    dep:'1',
                    serStr:"a"
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function(data) {
                    expect(data).to.be.an("object");
                    stub.restore();
                    done();
                },
                writeHead:function(){

                }
            };
            stub.callsArgWithAsync(2,error,null);
            controllerToTest.searchDocument(req,res); // call the function to be tested
        });
        it('returns the result', function(done) {
            var stub = sinon.stub(docService, 'getDocByDep');
            var req = {
                query:{
                    docType: '-1',
                    dep:'1',
                    serStr:"a"
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function(data) {
                    expect(data).to.be.a("string");
                    stub.restore();
                    done();
                },
                writeHead:function(){

                }
            };
            stub.callsArgWithAsync(2,null,{id:1,docCaption:'sample1'});
            controllerToTest.searchDocument(req,res); // call the function to be tested
        });//this

        it('returns the result', function(done) {
            var req = {
                query:{
                    docType: null,
                    dep: '6',
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
                    docType: '2',
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
                    dep:'4',
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
