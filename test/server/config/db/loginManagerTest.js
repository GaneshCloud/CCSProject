/**
 * Created by CSS on 28-05-2016.
 */
var mysql = require('mysql');

var chai = require('chai');

var expect = chai.expect;

var assert = chai.assert;

var should = chai.should();

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

        connection.getUserValidity('CBE001','Janani@1').then(function (result) {
            expect(result.length).not.equals(0);
            done();
        }).done();

    });

});