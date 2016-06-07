/**
 * Created by CSS on 01-06-2016.
 */

var chai = require("chai");

var expect = chai.expect;

var should = chai.should();

var personaldataManager = require("../../../../config/db/personaldataManager");

var data = [];

var connection = require("../../../../config/db/loginManager");

describe("#User Login Verification",function () {

    it("should return null since invalid user and password",function (done) {
        connection.getUserValidity('aaaa', 'cccc').then(function (result) {
            console.log("Result"+JSON.stringify(result));
            expect(result.length).equals(0);
            done();

        }).done();

    });

    it("should return id since valid user and password",function (done) {

        connection.getUserValidity('test001','Test@001').then(function (result) {
            expect(result.length).not.equals(0);
            data = result[0];
            done();
        }).done();

    });

    it("should return error since invalid data[user,Password] passed",function (done) {

        connection.getUserValidity(undefined,undefined).then(function (result) {
            should.exist(result);
            done();
        },function (error) {
            should.exist(error);
            done();
        }).done();

    });

});

describe("#UserDetails",function(){

    it('should return all user details',function (done) {

        personaldataManager.getUserDetails("user").then(function (result) {

            expect(result.length).not.equals(0);

            done();

        },function (error) {

            should.not.exist(error);

            done();

        }).done();

    });

    //
    it('should return error',function (done) {

            personaldataManager.getUserDetails(undefined).then(function (result) {

                should.not.exist(result);

                done();

            },function (error) {

                should.exist(error);

                done();

            }).done();

        });
});

describe("#UserData",function(){

    it('should get a User Data',function (done) {

        personaldataManager.getPersonalData(data.id).then(function (result) {

            expect(result.length).not.equals(0);

            data = result[0];

            done();

        },function (error) {

            should.not.exist(error);

            done();

        }).done();

    });

    it('should return error',function (done) {

        personaldataManager.getPersonalData("user").then(function (result) {

            should.not.exist(result);

            done();

        },function (error) {

            should.exist(error);

            done();

        }).done();

    });

});

describe("#Update Personal Data",function () {

    it("should update data into profile information table",function (done) {

        personaldataManager.updatePersonalData(data).then(function (result) {

            expect(result.length).not.equals(0);

            data = result[0];

            done();

        },function (error) {

            should.not.exist(error);

            done();

        }).done();

    });

    it("should update data into profile information table",function (done) {

        var sampleData = data;

        sampleData.id = 'hi';

        sampleData.deletedDate = 'hi';

        personaldataManager.updatePersonalData(sampleData).then(function (result) {

            should.not.exist(result);

            done();

        },function (error) {

            should.exist(error);

            done();

        }).done();

    });

});

describe("#Update Image",function () {

    it("should update image into profile information table",function (done) {

        personaldataManager.updateImage(data).then(function (result) {

            expect(result.length).not.equals(0);

            data = result[0];

            done();

        },function (error) {

            should.not.exist(error);

            done();

        }).done();

    });

    it("should update data into profile information table",function (done) {

        var sampleData = [];

        personaldataManager.updatePersonalData(sampleData).then(function (result) {

            should.not.exist(result);

            done();

        },function (error) {

            should.exist(error);

            done();

        }).done();

    });

});
