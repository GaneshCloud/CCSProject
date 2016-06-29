/**
 * Created by CSS on 28-05-2016.
 */

var chai = require('chai');

var supertest = require('supertest');

var should = chai.should();

var server;

var Browser = require('zombie');
//
// Browser.extend(function(browser) {
//     browser.on('authenticate', function (authentication) {
//         authentication.Email = 'csejananim@gmail.com';
//         authentication.Passwd = 'jananimanoharan#';
//
//     });
// });

before(function (done) {
    server = require('../../../server').server;
    done();
});

describe("#Get User Details",function () {

    this.timeout(40000);

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

});

describe("login using social sites",function () {

    this.timeout(40000);

    it("should login with facebook",function (done) {

        Browser.visit('http://127.0.0.1:3000/auth/facebook',function (err,brw) {

            if(err){
                throw err;
            }

            brw.fill('email','csejananim@gmail.com').fill('pass', 'janumanoharan')
                .pressButton('login', function (err,brow) {
                    brw.assert.success();
                    done();
                });

        });

    });

    it("should login with google",function (done) {

        this.timeout(80000);

        Browser.visit('http://127.0.0.1:3000/auth/google',function (err,brw) {

            if(err){
                throw err;
            }

            brw.fill('Email','csejananim@gmail.com').pressButton('signIn',function () {
                (brw.fill('Passwd', '18mydearnithya#').pressButton('signIn')).then(function (err,brow) {
                    console.log(brw.text('title'));
                    brw.assert.success(done());
                    // brw.assert.success();
                    // done();
                });
            });




        });



    });


});


after(function () {
    server.close();
});

