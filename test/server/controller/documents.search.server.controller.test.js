/**
 * Created by Administrator on 5/30/2016.
 */

var expect = require('chai').expect;
var controllerToTest = require('../../../controllers/documents.search.server.controller');


    describe("Search controller",function () {
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
            });
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
