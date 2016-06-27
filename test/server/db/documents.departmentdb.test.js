/**
 * Created by Administrator on 5/28/2016.
 */
var expect  = require("chai").expect;
// var mysql   = require("mysql");

var testDepartment = require("../../../config/db/documents/departmentdb");
// var testDepartment;
// var database = require('../../../config/db');
// var con = mysql.createConnection(
//     database
// );


describe("department Service Testing",function(){

    beforeEach(function () {
         // = new department(con);
    });
    describe("get All department", function () {
        it("get all data", function (done) {
            testDepartment.getAllDep(function (err, data) {
                expect(err).to.be.a('null');
                expect(data).to.be.an('array');
                done();
            });
        });
    });


    describe("ge department by id", function () {
        var id;
        it("check with null Id", function (done) {                          // null id
            id=null;
            testDepartment.getDepById(id,function (err, data) {
                expect(err).to.be.equal('error');
                expect(data).to.be.a('null');
                done();
            });
        });


        it("check with  ' ' Id", function (done) {                          //'' id
            id='';
            testDepartment.getDepById(id,function (err, data) {
                expect(err).to.be.equal('error');
                expect(data).to.be.a('null');
                done();
            });
        });

        it("check with  ' abc' Id", function (done) {                          //'' id
            id='*';
            testDepartment.getDepById(id,function (err, data) {
                expect(err).to.be.a('error');
                expect(data).to.be.a('null');
                done();
            });
        });


        it("check with  !exist Id", function (done) {                           //!exist id
            id=1;
            testDepartment.getDepById(id,function (err, data) {
                expect(err).to.be.a('null');
                expect(data).to.be.an('array');
                done();
            });
        });
    });

});
