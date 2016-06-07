/**
 * Created by CSS on 28-05-2016.
 */
var mysql = require('mysql');

var chai = require('chai');

var expect = chai.expect;

var assert = chai.assert;

var should = chai.should();

var connection = require("../../../../config/db/connectionManager");

describe("#getConnection",function () {

    it("should connect to database when connection is got from connectionManager File",function (done) {

        connection.getConnection().then(function(con){
           done();
        });

    });

});