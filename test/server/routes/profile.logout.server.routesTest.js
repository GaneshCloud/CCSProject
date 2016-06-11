/**
 * Created by CSS on 11-06-2016.
 */
var chai = require('chai');

var supertest = require('supertest');

var should = chai.should();

var server;

describe("#Logout",function () {

    beforeEach(function () {
        server = require('../../../server').server;
    });

    it("should return a logout screen",function (done) {

        supertest(server).get('/logout')
            .expect(200)
            .end(function (error,result) {
                should.not.exist(error);
                should.exist(result);
                done();
            });

    });

    afterEach(function () {
        server.close();
    });


});