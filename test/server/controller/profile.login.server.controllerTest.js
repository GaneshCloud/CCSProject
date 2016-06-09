/**
 * Created by CSS on 28-05-2016.
 */

var chai = require('chai');

var supertest = require('supertest');

var should = chai.should();

var expect = chai.expect;

var controller = require("../../../controllers/profile.login.server.controller.js");

describe("#Verify User",function () {

    var server;
    beforeEach(function () {
        server = require('../../../server');
    });
    
    it.only("should verify user valid",function (done) {

        var data = {
            user : 'CBE002',
            password : 'Janani@1'
        };

        supertest(server)
            .get('/auth/verifyUser')
            .send(data)
            .expect(200, done);
        
    });

    // afterEach(function () {
    //     server.close();
    // });
    
});