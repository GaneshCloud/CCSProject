/**
 * Created by CSS on 09-06-2016.
 */

var chai = require('chai');

var supertest = require('supertest');

var should = chai.should();

var server;

before(function () {
    server = require('../../../server').server;
});

describe("#Get User Details",function () {

    this.timeout(40000);

    it("should get user details",function (done) {

        supertest(server).get('/getUserDetails')
            .end(function (error,results) {

                console.log("results"+JSON.stringify(results));

                console.log("error"+JSON.stringify(error));

                should.exist(results);

                should.not.exist(error);

                done();

            });

    });

});

after(function () {
    server.close();
});
