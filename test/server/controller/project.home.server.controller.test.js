/**
 * Created by CSS on 28-05-2016.
 */

var chai = require('chai');

var supertest = require('supertest');

var should = chai.should();

var expect = chai.expect;

describe("#Get Project Data",function () {

    var server;
    beforeEach(function () {
        server = require('../../../server');
    });

    it.only("should get project data",function (done) {

        supertest(server)
            .get('/data')
            .send()
            .expect(200).then(function (results,err) {
            console.log("err"+err);
            console.log("results"+JSON.stringify(results));
            should.not.exist(err);
            should.exist(results);
            done();

        });

    });

    it.only("should get project History",function (done) {

        supertest(server)
            .get('/projectHistory')
            .send()
            .expect(200).then(function (results,err) {
            console.log("err"+err);
            console.log("results"+JSON.stringify(results));
            should.not.exist(err);
            should.exist(results);
            done();

        });

    });

    it.only("should get chart Data",function (done) {

        supertest(server)
            .get('/chartData')
            .send()
            .expect(200).then(function (results,err) {
            console.log("err"+err);
            console.log("results"+JSON.stringify(results));
            should.not.exist(err);
            should.exist(results);
            done();

        });

    });

    it.only("should get image Data",function (done) {

        supertest(server)
            .get('/imageData')
            .send()
            .expect(200).then(function (results,err) {
            console.log("err"+err);
            console.log("results"+JSON.stringify(results));
            should.not.exist(err);
            should.exist(results);
            done();

        });

    });

    // afterEach(function () {
    //     server.close();
    // });

});