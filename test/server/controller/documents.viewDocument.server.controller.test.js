/**
 * Created by Administrator on 5/30/2016.
 */
var expect = require('chai').expect;
var controllerToTest = require('../../../controllers/documents.viewDocument.server.controller');
docService= require('../../../config/db/documents/documentdb');
var sinon=require("sinon");
var error=new Error("some error occured");

describe("viewDocument controller",function () {
    describe('next Dcoument', function () {                                              //search document
        it('returns the result', function (done) {
            var stub=sinon.stub(docService,"getDocById");
            var req = {
                query: {
                    id: 2
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function (data) {
                    expect(data).to.be.a("string");
                    stub.restore();
                    done();
                }
            };
            stub.callsArgWithAsync(2,null,{ID:5,docCaption:"sample1"});
            controllerToTest.nextDocument(req, res); // call the function to be tested
        });

        it('returns the result', function (done) {
            var stub=sinon.stub(docService,"getDocById");
            var req = {
                query: {
                    id: 2
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function (data) {
                    expect(data).to.be.an("object");
                    stub.restore();
                    done();
                }
            };
            stub.callsArgWithAsync(2,error,null);
            controllerToTest.nextDocument(req, res); // call the function to be tested
        });

        it('returns the result', function (done) {
            var req = {
                query: {
                    id: ''
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function (data) {

                    expect(data).to.be.equal('invalid');
                    expect(data).to.be.a('string');
                    done();
                },
                writeHead: function () {

                }
            };
            controllerToTest.nextDocument(req, res); // call the function to be tested
        });

        it('returns the result', function (done) {
            var req = {
                query: {
                    id: null
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function (data) {
                    expect(data).to.be.equal('invalid');
                    expect(data).to.be.a('string');
                    done();
                },
                writeHead: function () {

                }
            };
            controllerToTest.nextDocument(req, res); // call the function to be tested
        });
        it('returns the result', function (done) {
            var req = {
                query: {
                    id: 'abc'
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function (data) {
                    expect(data).to.be.equal('invalid');
                    expect(data).to.be.a('string');
                    done();
                },
                writeHead: function () {

                }
            };
            controllerToTest.nextDocument(req, res); // call the function to be tested
        });


    });

    describe('previous Dcoument', function () {                                              //search document
        it('returns the result', function (done) {
            var stub=sinon.stub(docService,"getDocById");
            var req = {
                query: {
                    id: 2
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function (data) {
                    expect(data).to.be.an("string");
                    stub.restore();
                    done();
                }
            };
            stub.callsArgWithAsync(2,null,{ID:2,docCaption:"sample2"});
            controllerToTest.prevDocument(req, res); // call the function to be tested
        });
        it('returns the result', function (done) {
            var stub=sinon.stub(docService,"getDocById");
            var req = {
                query: {
                    id: 2
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function (data) {
                    expect(data).to.be.an("object");
                    stub.restore();
                    done();
                }
            };
            stub.callsArgWithAsync(2,error,null);
            controllerToTest.prevDocument(req, res); // call the function to be tested
        });

        it('returns the result', function (done) {
            var req = {
                query: {
                    id: ''
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function (data) {

                    expect(data).to.be.equal('invalid');
                    expect(data).to.be.a('string');
                    done();
                },
                writeHead: function () {

                }
            };
            controllerToTest.prevDocument(req, res); // call the function to be tested
        });

        it('returns the result', function (done) {
            var req = {
                query: {
                    id: null
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function (data) {
                    expect(data).to.be.equal('invalid');
                    expect(data).to.be.a('string');
                    done();
                },
                writeHead: function () {

                }
            };
            controllerToTest.prevDocument(req, res); // call the function to be tested
        });
        it('returns the result', function (done) {
            var req = {
                query: {
                    id: 'abc'
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function (data) {
                    expect(data).to.be.equal('invalid');
                    expect(data).to.be.a('string');
                    done();
                },
                writeHead: function () {

                }
            };
            controllerToTest.prevDocument(req, res); // call the function to be tested
        });
    });

    describe('previous Dcoument', function () {                                              //search document
        it('returns the result', function (done) {
            var req = {
                query: {
                    id: 2
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function (data) {
                    expect(data).to.be.a("string");
                    done();
                }
            };
            controllerToTest.prevDocument(req, res); // call the function to be tested
        });

        it('returns the result', function (done) {
            var req = {
                query: {
                    id: ''
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function (data) {

                    expect(data).to.be.equal('invalid');
                    expect(data).to.be.a('string');
                    done();
                },
                writeHead: function () {

                }
            };
            controllerToTest.prevDocument(req, res); // call the function to be tested
        });

        it('returns the result', function (done) {
            var req = {
                query: {
                    id: null
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function (data) {
                    expect(data).to.be.equal('invalid');
                    expect(data).to.be.a('string');
                    done();
                },
                writeHead: function () {

                }
            };
            controllerToTest.prevDocument(req, res); // call the function to be tested
        });
        it('returns the result', function (done) {
            var req = {
                query: {
                    id: 'abc'
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function (data) {
                    expect(data).to.be.equal('invalid');
                    expect(data).to.be.a('string');
                    done();
                },
                writeHead: function () {

                }
            };
            controllerToTest.prevDocument(req, res); // call the function to be tested
        });
    });

    describe('readZip Dcoument', function () {                                              //search document

        it('returns the result', function (done) {
            var req = {
                query: {
                    id: 506
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function (data) {
                    expect(data).to.be.a("string");
                    // setTimeout(3000);
                    done();
                }
            };

            controllerToTest.readZip(req, res); // call the function to be tested
        });

        it('returns the result', function (done) {
            var stub=sinon.stub(docService,"getDocById");
            var req = {
                query: {
                    id: 506
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function (data) {
                    expect(data).to.be.a("string");
                    // setTimeout(3500);
                    stub.restore();
                    done();
                }
            };
            stub.callsArgWithAsync(2,null,[]);
            controllerToTest.readZip(req, res); // call the function to be tested
        });

        it('returns the result', function (done) {
            var req = {
                query: {
                    id: ''
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function (data) {

                    expect(data).to.be.equal('invalid');
                    expect(data).to.be.a('string');
                    done();
                },
                writeHead: function () {

                }
            };
            controllerToTest.readZip(req, res); // call the function to be tested
        });

        it('returns the result', function (done) {
            var req = {
                query: {
                    id: null
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function (data) {
                    expect(data).to.be.equal('invalid');
                    expect(data).to.be.a('string');
                    done();
                },
                writeHead: function () {

                }
            };
            controllerToTest.readZip(req, res); // call the function to be tested
        });
        it('returns the result', function (done) {
            var req = {
                query: {
                    id: 'abc'
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function (data) {
                    expect(data).to.be.equal('invalid');
                    expect(data).to.be.a('string');
                    done();
                },
                writeHead: function () {

                }
            };
            controllerToTest.readZip(req, res); // call the function to be tested
        });
    });


    describe('view document', function () {                                              //search document

        it('returns the result', function (done) {
            var stub=sinon.stub(docService,"incrViews");
            var req = {
                query: {
                    id: 2
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function (data) {
                    expect(data).to.be.a("string");
                    expect(data).to.be.equal("valid");
                    stub.restore();
                    done();
                }
            };
            stub.callsArgWithAsync(1,null);
            controllerToTest.viewDocument(req, res); // call the function to be tested
        });

        it('returns the result', function (done) {
            var stub=sinon.stub(docService,"incrViews");
            var req = {
                query: {
                    id: 2
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function (data) {
                    expect(data).to.be.an("object");
                    stub.restore();
                    done();
                }
            };
            stub.callsArgWithAsync(1,error);
            controllerToTest.viewDocument(req, res); // call the function to be tested
        });

        it('returns the result', function (done) {
            var req = {
                query: {
                    id: ''
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function (data) {

                    expect(data).to.be.equal('invalid');
                    expect(data).to.be.a('string');
                    done();
                },
                writeHead: function () {

                }
            };
            controllerToTest.viewDocument(req, res); // call the function to be tested
        });

        it('returns the result', function (done) {
            var req = {
                query: {
                    id: null
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function (data) {
                    expect(data).to.be.equal('invalid');
                    expect(data).to.be.a('string');
                    done();
                },
                writeHead: function () {

                }
            };
            controllerToTest.viewDocument(req, res); // call the function to be tested
        });
        it('returns the result', function (done) {
            var req = {
                query: {
                    id: 'abc'
                }
            };
            // we provide the response object which the controller uses
            var res = {
                end: function (data) {
                    expect(data).to.be.equal('invalid');
                    expect(data).to.be.a('string');
                    done();
                },
                writeHead: function () {

                }
            };
            controllerToTest.viewDocument(req, res); // call the function to be tested
        });
    });

    describe('download document', function () {                                              //search document
        it('returns the result', function (done) {
            var stub=sinon.stub(docService,"incrDown");
            var stubDoc=sinon.stub(docService,"getDocById");
            var req = {
                query: {
                    id: 2
                }
            };
            // we provide the response object which the controller uses
            var resp = {
                end: function (data) {
                    expect(data).to.be.a("string");
                    expect(data).to.be.equal("NO_DOCUMENT");
                    stub.restore();
                    stubDoc.restore();
                    done();
                }
            };
            stubDoc.callsArgWithAsync(2,null,[]);
            stub.callsArgWithAsync(1,null,{});

            controllerToTest.downloadDocument(req, resp); // call the function to be tested
        });

        it('returns the result', function (done) {
            var stub=sinon.stub(docService,"incrDown");
            var stubDoc=sinon.stub(docService,"getDocById");
            var req = {
                query: {
                    id: 2
                }
            };
            // we provide the response object which the controller uses
            var resp = {
                end: function (data) {
                    expect(data).to.be.an("object");
                    stub.restore();
                    stubDoc.restore();
                    done();
                }
            };
            stubDoc.callsArgWithAsync(2,null,[{ID:2,docCaption:"sample1",docFile:"sa.pdf"}]);
            stub.callsArgWithAsync(1,error,{});

            controllerToTest.downloadDocument(req, resp); // call the function to be tested
        });

        it('returns the result', function (done) {
            var req = {
                query: {
                    id: ''
                }
            };
            // we provide the response object which the controller uses
            var resp = {
                end: function (data) {

                    expect(data).to.be.equal('invalid');
                    expect(data).to.be.a('string');
                    done();
                },
                writeHead: function () {

                }
            };
            controllerToTest.downloadDocument(req, resp); // call the function to be tested
        });

        it('returns the result', function (done) {
            var req = {
                query: {
                    id: null
                }
            };
            // we provide the response object which the controller uses
            var resp = {
                end: function (data) {
                    expect(data).to.be.equal('invalid');
                    expect(data).to.be.a('string');
                    done();
                },
                writeHead: function () {

                }
            };
            controllerToTest.downloadDocument(req, resp); // call the function to be tested
        });
        it('returns the result', function (done) {
            var req = {
                query: {
                    id: 'abc'
                }
            };
            // we provide the response object which the controller uses
            var resp = {
                end: function (data) {
                    expect(data).to.be.equal('invalid');
                    expect(data).to.be.a('string');
                    done();
                },
                writeHead: function () {

                }
            };
            controllerToTest.downloadDocument(req, resp); // call the function to be tested
        });

        it('returns the result', function (done) {
            var req = {
                query: {
                    id: 506
                }
            };
            // we provide the response object which the controller uses
            var resp = {
                end: function (data) {
                    expect(data).to.be.equal('invalid');
                    expect(data).to.be.a('string');

                },
                writeHead: function () {

                },
                download:function(){
                    done();
                }

            };
            controllerToTest.downloadDocument(req, resp); // call the function to be tested
        });

        it('returns the result', function (done) {
            var req = {
                query: {
                    id: 522
                }
            };
            // we provide the response object which the controller uses
            var resp = {
                end: function (data) {
                    expect(data).to.be.equal('No_file_found');
                    expect(data).to.be.a('string');
                    done();

                },
                writeHead: function () {

                },
                download:function(){
                    done();
                }

            };
            controllerToTest.downloadDocument(req, resp); // call the function to be tested
        });


    });

    describe("user mode",function(){
        it('returns the result', function (done) {
            var req = {
                query: {
                    id: 506
                },
                session:{
                    data:{
                        userType:"admin"
                    }
                }
            };
            // we provide the response object which the controller uses
            var resp = {
                end: function (data) {

                    expect(data).to.be.equal('{"mode":"admin"}');
                    done();
                },
                send:function(){
                    // done();
                }

            };
            controllerToTest.userMode(req, resp); // call the function to be tested
        });
    });
});

