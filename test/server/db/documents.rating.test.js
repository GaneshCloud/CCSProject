
var expect  = require("chai").expect;
var mysql   = require("mysql");
var starDocument = require("../../../config/db/documents/ratingdb");

var database = require('../../../config/db');
var con = mysql.createConnection(
database
);
var testStarDoc;


describe("Unit test for Rating  Services",function() {

  beforeEach(function () {
    testStarDoc = new starDocument(con);
  });

  describe("Rate info", function () {
    it("check star rating info with !existing id", function (done) {                //check the not existing data
        testStarDoc.getStarInfo(1, function (err, data) {
          expect(err).to.be.a('null');
          expect(data).to.be.an('array');
          expect(data.length).to.be.equal(0);
          done();

      });
    });

    it("check star rating info with existing id", function (done) {                  //check exiting data
      testStarDoc.getStarInfo(509, function (err, data) {
        expect(data).to.be.an("array");
        expect(data.length).to.be.above(0);
        expect(err).to.be.a("null");
        done();
      });

    });

    it("check star rating info with string id", function (done) {                  //check with string id
      testStarDoc.getStarInfo('abc', function (err, data) {
        expect(data).to.be.a("null");
        expect(err).to.be.an("error");
        done();
      });

    });

    it("check star rating info with '' for id", function (done) {                    //check '' value for id
      testStarDoc.getStarInfo('', function (err, data) {
        expect(err).to.be.equal("error");
        expect(data).to.be.a("null");
        done();
      });

    });

    it("check star rating info with null value for  id", function (done) {            //check null value for id
      testStarDoc.getStarInfo(null, function (err, data) {
        expect(err).to.be.equal("error");
        expect(data).to.be.a("null");
        done();
      });

    });
  });


  //setStar Function
  describe('setStar Function',function () {

    var starNullDat={};                                                                 //NULL DATA
    var starStrData='ABC';                                                               //STRIMNG DATA
    var starempData='';                                                                  //EMPTY DATA
    var starValidData={DOC_ID:509,STARS:2,USER_ID:2,STAR_DATE:'27-05-2016'};            //CORRECT DATA


    it("set star rating info with null data",function (done) {
      testStarDoc.setStar(starNullDat,function(err,insertId){
        expect(err).to.be.a("error");
        expect(insertId).to.be.a("null");
        done();
      });
    });

    it("set star rating info with null data",function (done) {
      testStarDoc.setStar(starStrData,function(err,insertId){
        expect(err).to.be.equal("error");
        expect(insertId).to.be.a("null");
        done();
      });
    });

    it("set star rating info with '' data",function (done) {
      testStarDoc.setStar(starempData,function(err,insertId){
        expect(err).to.be.equal("error");
        expect(insertId).to.be.a("null");
        done();
      });
    });



    it("set star rating info with valid data",function (done) {
      testStarDoc.setStar(starValidData,function(err,insertId){
        expect(err).to.be.a("null");
        expect(insertId).to.be.a("number");
        done();
      });
    });



  });


  describe('getStar Function',function () {



    it("getting star rating info by null id",function (done) {              //checking by null id
      testStarDoc.getStar(null,function(err,result){
        expect(err).to.be.equal("error");
        expect(result).to.be.a("null");
        done();
      });
    });

    it("get star rating info with '' id",function (done) {                  //checking by '' id
        testStarDoc.getStar('',function(err,result){
        expect(err).to.be.equal("error");
        expect(result).to.be.a("null");
        done();
      });
    });

    it("get star rating info with valid data",function (done) {             //checking by existing id
        testStarDoc.getStar(509,function(err,result){
            expect(err).to.be.a("null");
            expect(result).to.be.an("array");
            expect(result.length).to.be.above(0);
            done();
      });
    });

    it("get star rating info with valid data",function (done) {             //checking by !existing id
      testStarDoc.getStar(1,function(err,result){
        expect(err).to.be.a("null");
        expect(result).to.be.an("array");
        done();
      });
    });

    it("get star rating info with string id",function (done) {             //checking by string id
      testStarDoc.getStar('abc',function(err,result){
        expect(err).to.be.a("error");
        expect(result).to.be.an("null");
        done();
      });
    });



  });

});








