/**
 * Created by Administrator on 5/30/2016ss.
 */

var expect = require('chai').expect;
var db= require('../../../config/db');
var mysql=require('mysql');
var controllerToTest = require('../../../controllers/documents.documentManager.server.controller.js');
var documentService = require('../../../config/db/documents/documentdb');
var con=mysql.createConnection(db);
var docService=new documentService(con);
// var sinon = require('sinon');

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
                    done();
                }
            };
            controllerToTest.getDocument(req,res); // call the function to be tested
        });

        it('returns the result', function(done) {
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
                    done();
                }
            };
            controllerToTest.getDocument(req,res); // call the function to be tested
        });
        it('returns the result', function(done) {
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
                    done();
                }
            };
            controllerToTest.getDocument(req,res); // call the function to be tested
        });

    });

    describe('search Document', function() {//search document

        beforeEach(function() {

        });

        afterEach(function() {
             // this actually doesn't restore the myFunc function, only window.myFunc

        });

        it('returns the result', function(done) {
            // var stub1 = sinon.stub(docService, 'getDocByTypeDep');
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
                    // stub1.restore();
                    done();
                },
                writeHead:function(){

                }
            };
            // var error = new Error('Authentication failed.');
            // stub1.callsArgWithAsync(3,error,error);
            controllerToTest.searchDocument(req,res); // call the function to be tested



        });

        it('returns the result', function(done) {
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
                    dep:'-1',
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
                    docType: '-1',
                    dep:'1',
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
