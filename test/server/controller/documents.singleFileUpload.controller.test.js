/**
 * Created by Administrator on 6/13/2016.
 */
var expect = require('chai').expect;
var sinon   = require("sinon");
var supertest = require('supertest');
var controllerToTest = require('../../../controllers/documents.singleFileUpload.server.controller');
// var serDepartment = require('../config/db/documents/departmentdb'),
// docService = new serDocument(con), depServiceObj = new serDepartment(con);


var server;
// form.append('my_file', fs.createReadStream('/foo/bar.jpg'));


describe("single FileUpload controller",function () {
    before(function () {
        server = require('../../../server').server;
        // var searchDocument = sinon.spy(documentListCtrl, 'searchDocument');
    });

    describe('upload Dcoument', function () {
        it('#upload', function (done) {
            supertest(server).post('/documents/upload')
                .field('docCaption', 'test1')
                .field('docType', '1')
                .field('docDep', '3')
                .field('docKey', 'key1,key2')
                .field('docDesc', 'abv')
                .field('docId', '')
                .attach('docFile', __dirname+'/../../../temp/523.docx')
                .end(function(err, res) {
                    
                    done();
                });

        });

        it('#upload', function (done) {
            supertest(server).post('/documents/upload')
                .field('docCaption', 'test1')
                .field('docType', '1')
                .field('docDep', '3')
                .field('docKey', 'key1,key2')
                .field('docDesc', 'abv')
                .field('docId', '502')
                .attach('docFile', __dirname+'/../../../temp/523.docx')
                .end(function(err, res) {

                    done();
                });

        });

    describe('get department', function () {
        it('#getdepartment', function (done) {
            var req = {
            };
            var res = {
                end: function (data) {
                    expect(data).to.be.a('string');
                    done();
                }
            };
            controllerToTest.getDepartment (req, res); // call the function to be tested
        });
    });

    });
});


