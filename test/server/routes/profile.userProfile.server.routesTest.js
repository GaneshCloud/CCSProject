/**
 * Created by CSS on 11-06-2016.
 */
var chai = require('chai');

var supertest = require('supertest');

var session = require('supertest-session');

var should = chai.should();

var server;

// var testSession;

before(function () {
   server = require('../../../server').server;
    // testSession = session(server);
});

// var data = {
//     id:1
// }
//
// var testSession = session(require('../../../server').server, {
//     before: function (req) {
//         req.set('authorization', 'Basic aGVsbG86d29ybGQK');
//         req.session = {};
//         req.session = data;
//     }
// });

var userData = [];

describe("#User Profile CRUD Operation",function () {

    this.timeout(40000);

    it("should get User Data",function (done) {

        // testSession.get('/connect/getPersonalData')
        supertest(server).get('/connect/getPersonalData')
            .end(function (error,results) {

                // console.log("results"+JSON.stringify(results));
                //
                // console.log("error"+JSON.stringify(error));

                userData = results;

                should.exist(results);

                should.not.exist(error);

                done();

            });

    });

    it("should Update User Data",function (done) {

        // testSession.post('/connect/updatePersonalData')
        supertest(server).post('/connect/updatePersonalData')
            .send(userData)
            .end(function (error,results) {

                // console.log("results"+JSON.stringify(results));
                //
                // console.log("error"+JSON.stringify(error));

                should.exist(results);

                should.not.exist(error);

                done();

            });

    });

    it("should Post Image",function (done) {

        var data = {
            file:{
                fieldname:'',
                filename:''

            }
        }

        supertest(server).post('/connect/uploadImage')
            .send(data)
            .end(function (error,results) {

                // console.log("results"+JSON.stringify(results));
                //
                // console.log("error"+JSON.stringify(error));

                should.exist(results);

                should.not.exist(error);

                done();

            });

    });

});

after(function () {
    // this.request.restoreData();
    server.close();
});
