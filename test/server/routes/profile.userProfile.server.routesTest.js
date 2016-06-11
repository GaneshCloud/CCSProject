/**
 * Created by CSS on 11-06-2016.
 */
var chai = require('chai');

var supertest = require('supertest');

var should = chai.should();

var server;

before(function () {
    server = require('../../../server').server;
});

var userData = [];

describe("#User Profile CRUD Operation",function () {

    this.timeout(40000);

    it("should get User Data",function (done) {

        supertest(server).get('/connect/getPersonalData')
            .end(function (error,results) {

                console.log("results"+JSON.stringify(results));

                console.log("error"+JSON.stringify(error));

                userData = results;

                should.exist(results);

                should.not.exist(error);

                done();

            });

    });

    it("should Update User Data",function (done) {

        supertest(server).post('/connect/updatePersonalData')
            .send(userData)
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
