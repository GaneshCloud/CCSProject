/**
 * Created by Administrator on 5/27/2016.
 */
var expect  = require("chai").expect;
var mysql   = require("mysql");

var Document = require("../../../config/db/documents/documentdb");
var testDocument;
var database = require('../../../config/db');
var con = mysql.createConnection(
    database
);
console.log(con);

    describe("Unit test for Document",function() {

        beforeEach(function () {
            testDocument = new Document(con);
        });

        describe("get All Document", function () {
            var ser;
            it("check documents Data", function (done) {                                    //check the valid data
                ser="";
                testDocument.getAllDoc(ser,function (err, data) {
                    expect(err).to.be.a('null');
                    expect(data).to.be.an('array');
                    expect(data.length).to.be.above(0);
                    done();
                });
            });


            it("check documents Data", function (done) {                                    //check the invalid data
                ser="'";
                testDocument.getAllDoc(ser,function (err, data) {
                    expect(err).to.be.an('error');
                    expect(data).to.be.a('null');
                    done();
                });
            });
    });



    describe.skip("insert  Document", function () {

        var data1={

            DOCCAPTION:"TEST1",
            DOCTYPE:2,
            DOCDEP:2,
            DOCKEY:"C,C++",
            DOCDESC:"TEST DESC",
            DOCDATE:"14-5-2016",
            DOCFILE:"TEST.MP3"
        };

        var data2={};



        it("check inserDocuments Data", function (done) {                                    //check the valid  data
            testDocument.insertDoc(data1,function (err, insertId) {
                expect(err).to.be.a('null');
                expect(insertId).to.be.a('number');
                expect(insertId).to.be.above(0);
                done();
            });
        });

        it("check documents Data", function (done) {                                    //check the not valid data
            testDocument.insertDoc(data2,function (err, insertId) {
                expect(err).to.be.equal('error');
                expect(insertId).to.be.a('null');
                done();
            });
        });
    });



    describe("getDocument By Id  Document", function () {


        it("check with null Id", function (done) {                                    //check the null  id
            var id=null;
            testDocument.getDocById(id,0,function (err, data) {
                expect(err).to.be.equal('error');
                expect(data).to.be.a('null');
                done();
            });
        });

        it("check with '' Data", function (done) {                                    //check the not valid data
            var id='';
            testDocument.getDocById(id,0,function (err, data) {
                expect(err).to.be.equal('error');
                expect(data).to.be.a('null');
                done();
            });
        });

        it("check with !existing  Data", function (done) {                            //check the not existing id
            var id=1;
            testDocument.getDocById(id,0,function (err, data) {
                expect(err).to.be.a('null');
                expect(data).to.be.an('array');

                done();
            });
        });

        it("check with existing  Data", function (done) {                            //check the existing id
            var id=522;
            testDocument.getDocById(id,0,function (err, data) {
                console.log(data);
                expect(err).to.be.a('null');
                expect(data).to.be.an('array');
                //expect(data[0].ID).to.be.equal(522);

                done();
            });
        });

        it("check with existing  Data", function (done) {                            //check the existing id
            var id=506;
            testDocument.getDocById(id,1,function (err, data) {
                console.log(data);
                expect(err).to.be.a('null');
                expect(data).to.be.an('array');
                //expect(data[0].ID).to.be.equal(522);

                done();
            });
        });

        it("check with existing  Data", function (done) {                            //check the existing id
            var id=507;
            testDocument.getDocById(id,-1,function (err, data) {
                console.log(data);
                expect(err).to.be.a('null');
                expect(data).to.be.an('array');
                //expect(data[0].ID).to.be.equal(522);

                done();
            });
        });

        it("check with string Data", function (done) {                            //check the existing id
            var id='abc';
            testDocument.getDocById(id,0,function (err, data) {
                console.log(data);
                expect(err).to.be.an('error');
                expect(data).to.be.an('null');


                done();
            });
        });

    });

        describe("delete Document By Id", function () {


            it("check with null Id", function (done) {                                    //check the null  id
                var id=5;
                testDocument.deleteDoc(id,function (err, data) {
                    expect(err).to.be.equal('error');
                    expect(data).to.be.a('null');
                    done();
                });
            });

            it("check with '' Data", function (done) {                                    //check the not valid data
                var id={ID:''};
                testDocument.deleteDoc(id,function (err, data) {
                    expect(err).to.be.equal('error');
                    expect(data).to.be.a('null');
                    done();
                });
            });

            it("check with !existing  Data", function (done) {                            //check the not existing id
                var id={ID:1};
                testDocument.deleteDoc(id,function (err, data) {
                    expect(err).not.to.be.a('object');
                    expect(data).to.be.an('object');

                    done();
                });
            });

            it("check with existing  Data", function (done) {                            //check the not existing id
                var id={ID:509};
                testDocument.deleteDoc(id,function (err, data) {
                    expect(err).not.to.be.a('object');
                    expect(data).to.be.an('object');

                    done();
                });
            });

            it("check with existing string id", function (done) {                            //check the string  id
                var id={ID:"'"};
                testDocument.deleteDoc(id,function (err, data) {
                    console.log(err);
                    expect(err).to.be.an('null');
                    expect(data).to.be.an('object');

                    done();
                });
            });



        });

        describe("getDocument By Department", function () {

            var depId;
            var ser='';

            it("check with null Id", function (done) {                                    //check the null  id
                depId=null;
                ser="";

                testDocument.getDocByDep(ser,depId,function (err, data) {
                    expect(err).to.be.equal('error');
                    expect(data).to.be.a('null');
                    done();
                });
            });

            it("check with '' Data", function (done) {                                    //check the not valid data
                depId='';
                testDocument.getDocByDep(ser,depId,function (err, data) {
                    expect(err).to.be.equal('error');
                    expect(data).to.be.a('null');
                    done();
                });
            });

            it("check with !existing  Data", function (done) {                            //check the not existing id
                depId=-1;
                testDocument.getDocByDep(ser,depId,function (err, data) {
                    expect(err).to.be.a('null');
                    expect(data).to.be.an('array');

                    done();
                });
            });

            it("check with existing  Data", function (done) {                            //check the existing id
                var id=2;
                testDocument.getDocByDep(ser,depId,function (err, data) {
                    console.log(data);
                    expect(err).to.be.a('null');
                    expect(data).to.be.an('array');


                    done();
                });
            });

            it("check with existing ''' search", function (done) {                            //check the existing id
                var id=2;
                ser="'";
                testDocument.getDocByDep(ser,depId,function (err, data) {
                    console.log(data);
                    expect(err).to.be.an('error');
                    done();
                });
            });

        });



        describe("getDocument By documentType", function () {

            var typeId;
            var ser='';

            it("check with null Id", function (done) {                                    //check the null  id
                typeId=null;
                ser="";

                testDocument.getDocByType(ser,typeId,function (err, data) {
                    expect(err).to.be.equal('error');
                    expect(data).to.be.a('null');
                    done();
                });
            });

            it("check with '' Data", function (done) {                                    //check the not valid data
                typeId='';
                testDocument.getDocByType(ser,typeId,function (err, data) {
                    expect(err).to.be.equal('error');
                    expect(data).to.be.a('null');
                    done();
                });
            });

            it("check with !existing  Data", function (done) {                            //check the not existing id
                typeId=-1;
                testDocument.getDocByType(ser,typeId,function (err, data) {
                    expect(err).to.be.a('null');
                    expect(data).to.be.an('array');

                    done();
                });
            });

            it("check with existing  Data", function (done) {                            //check the existing id
                var typeId=2;
                testDocument.getDocByType(ser,typeId,function (err, data) {
                    console.log(data);
                    expect(err).to.be.a('null');
                    expect(data).to.be.an('array');


                    done();
                });
            });

            it("check with existing ''' search", function (done) {                            //check the existing id
                typeId=2;
                ser="'";
                testDocument.getDocByType(ser,typeId,function (err, data) {
                    console.log(data);
                    expect(err).to.be.an('error');
                    done();
                });
            });

        });


        describe("getDocument By documentDepType", function () {

            var typeId,depId;
            var ser='';

            it("check with null Id", function (done) {                                    //check the null  id
                typeId=null,depId=null;
                ser="";

                testDocument.getDocByTypeDep(ser,typeId,depId,function (err, data) {
                    expect(err).to.be.equal('error');
                    expect(data).to.be.a('null');
                    done();
                });
            });

            it("check with '' Data", function (done) {                                    //check the not valid data
                typeId='',depId='';
                testDocument.getDocByTypeDep(ser,typeId,depId,function (err, data) {
                    expect(err).to.be.equal('error');
                    expect(data).to.be.a('null');
                    done();
                });
            });

            it("check with !existing  Data", function (done) {                            //check the not existing id
                typeId=-1,depId=-1;
                testDocument.getDocByTypeDep(ser,typeId,depId,function (err, data) {
                    expect(err).to.be.a('null');
                    expect(data).to.be.an('array');

                    done();
                });
            });

            it("check with existing  Data", function (done) {                            //check the existing id
                var typeId=2,depId=2;
                testDocument.getDocByTypeDep(ser,typeId,depId,function (err, data) {
                    console.log(data);
                    expect(err).to.be.a('null');
                    expect(data).to.be.an('array');
                    done();
                });
            });

            it("check with existing ''' search", function (done) {                            //check the existing id
                typeId=2,depId=2;
                ser="'";
                testDocument.getDocByTypeDep(ser,typeId,depId,function (err, data) {
                    console.log(data);
                    expect(err).to.be.an('error');
                    done();
                });
            });

        });


        describe("increment views", function () {

            var id;


            it("check with null Id", function (done) {                                    //check the null  id
                id=null;

                testDocument.incrViews(id,function (err, data) {
                    expect(err).to.be.equal('error');
                    expect(data).to.be.a('null');
                    done();
                });
            });

            it("check with '' Data", function (done) {                                    //check the not valid data
                id='';
                testDocument.incrViews(id,function (err, data) {
                    expect(err).to.be.equal('error');
                    expect(data).to.be.a('null');
                    done();
                });
            });

            it("check with !existing  Data", function (done) {                            //check the not existing id
                id=-1;
                testDocument.incrViews(id,function (err, data) {
                    expect(err).to.be.a('null');
                    expect(data).to.be.a('string');

                    done();
                });
            });

            it("check with existing  Data", function (done) {                            //check the existing id
                var id=510;
                testDocument.incrViews(id,function (err, data) {
                    console.log(data);
                    expect(err).to.be.a('null');
                    expect(data).to.be.a('string');

                    done();
                });
            });



        });

        describe("increment down", function () {

            var id;


            it("check with null Id", function (done) {                                    //check the null  id
                id=null;

                testDocument.incrDown(id,function (err, data) {
                    expect(err).to.be.equal('error');
                    expect(data).to.be.a('null');
                    done();
                });
            });

            it("check with '' Data", function (done) {                                    //check the not valid data
                id='';
                testDocument.incrDown(id,function (err, data) {
                    expect(err).to.be.equal('error');
                    expect(data).to.be.a('null');
                    done();
                });
            });

            it("check with !existing  Data", function (done) {                            //check the not existing id
                id=-1;
                testDocument.incrDown(id,function (err, data) {
                    expect(err).to.be.a('null');
                    expect(data).to.be.an('string');

                    done();
                });
            });

            it("check with existing  Data", function (done) {                            //check the existing id
                var id=510;
                testDocument.incrViews(id,function (err, data) {
                    console.log(data);
                    expect(err).to.be.a('null');
                    expect(data).to.be.an('string');

                    done();
                });
            });
        });

        // describe("get Next document", function () {
        //
        //     var id;
        //
        //
        //     it("check with null Id", function (done) {                                    //check the null  id
        //         id=null;
        //
        //         testDocument.getNextDocument(id,function (err, data) {
        //             expect(err).to.be.equal('error');
        //             expect(data).to.be.a('null');
        //             done();
        //         });
        //     });
        //
        //     it("check with '' Data", function (done) {                                    //check the not valid data
        //         id='';
        //         testDocument.getNextDocument(id,function (err, data) {
        //             expect(err).to.be.equal('error');
        //             expect(data).to.be.a('null');
        //             done();
        //         });
        //     });
        //
        //     it("check with !existing  Data", function (done) {                            //check the not existing id
        //         id=-1;
        //         testDocument.getNextDocument(id,function (err, data) {
        //             expect(err).to.be.a('null');
        //             expect(data).to.be.an('array');
        //
        //             done();
        //         });
        //     });
        //
        //     it("check with existing  Data", function (done) {                            //check the existing id
        //         var id=510;
        //         testDocument.getNextDocument(id,function (err, data) {
        //             console.log(data);
        //             expect(err).to.be.a('null');
        //             expect(data).to.be.an('array');
        //
        //             done();
        //         });
        //     });
        //
        //     it("check with STRING ID", function (done) {                            //check the string id
        //         id='ABC';
        //         testDocument.getNextDocument(id,function (err, data) {
        //             console.log(data);
        //             expect(err).to.be.an('error');
        //             expect(data).to.be.a('null');
        //
        //             done();
        //         });
        //     });
        // });

        // describe("get previous document", function () {
        //
        //     var id;
        //
        //
        //     it("check with null Id", function (done) {                                    //check the null  id
        //         id=null;
        //
        //         testDocument.getPrevDocument(id,function (err, data) {
        //             expect(err).to.be.equal('error');
        //             expect(data).to.be.a('null');
        //             done();
        //         });
        //     });
        //
        //     it("check with '' Data", function (done) {                                    //check the not valid data
        //         id='';
        //         testDocument.getPrevDocument(id,function (err, data) {
        //             expect(err).to.be.equal('error');
        //             expect(data).to.be.a('null');
        //             done();
        //         });
        //     });
        //
        //     it("check with !existing  Data", function (done) {                            //check the not existing id
        //         id=-1;
        //         testDocument.getPrevDocument(id,function (err, data) {
        //             expect(err).to.be.a('null');
        //             expect(data).to.be.an('array');
        //
        //             done();
        //         });
        //     });
        //
        //     it("check with existing  Data", function (done) {                            //check the existing id
        //         id=510;
        //         testDocument.getPrevDocument(id,function (err, data) {
        //             console.log(data);
        //             expect(err).to.be.a('null');
        //             expect(data).to.be.an('array');
        //
        //             done();
        //         });
        //     });
        //
        //     it("check with STRING ID", function (done) {                            //check the string id
        //         id='ABC';
        //         testDocument.getPrevDocument(id,function (err, data) {
        //             console.log(data);
        //             expect(err).to.be.an('error');
        //             expect(data).to.be.a('null');
        //
        //             done();
        //         });
        //     });
        // });
});
