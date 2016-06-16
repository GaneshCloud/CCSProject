/**
 * Created by Administrator on 6/16/2016.
 */
/**
 * Created by Administrator on 6/13/2016.
 */
var expect = require('chai').expect;
var sinon   = require("sinon");
var supertest = require('supertest');
var controllerToTest = require('../../../controllers/documents.multipleFileUpload.server.controller');


var server;
// form.append('my_file', fs.createReadStream('/foo/bar.jpg'));


describe("multiple FileUpload controller",function () {
    before(function () {
        server = require('../../../server').server;
        this.timeout(40000);

    });

    describe('upload Dcoument', function () {
        it('#upload', function (done) {
            supertest(server).post('/uploadMulti')
                .field('docCaption1', 'test1')
                .field('docType1', '1')
                .field('docDep1', '3')
                .field('docKey1', 'key1,key2')
                .field('docDesc1', 'abv')
                .field('docId1', '')
                .attach('docFile1', __dirname+'/../../../temp/523.docx')

                .end(function(err, res) {

                    done();
                });

        });


    });
});


