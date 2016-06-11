/**
 * Created by CSS on 28-05-2016.
 */
/**
 * Created by CSS on 09-06-2016.
 */

var chai = require('chai');

var supertest = require('supertest');

var should = chai.should();

var server;


describe("#Get User Details",function () {

    this.timeout(40000);

    beforeEach(function () {
        server = require('../../../server').server;
    });

    it("should verify the user validity",function (done) {

        var data = {
            user : 'CBE001',
            password : 'Janani@1'
        };
        
        supertest(server).post('/auth/verifyUser')
            .send(data)
            .end(function (error,results) {

                console.log("results"+JSON.stringify(results));

                console.log("error"+JSON.stringify(error));

                should.exist(results);

                should.not.exist(error);

                done();

            });

    });


    afterEach(function () {
        server.close();
    });

});

