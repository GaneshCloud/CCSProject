var chai = require('chai');

var mysql = require('mysql');

var assert = chai.assert;

var q = require('q');

var expect = chai.expect;

var appNodeObj = require('../../../../config/db/forumManager.js');

var dbConn = require('../../../../config/db.js');

// --------------------post Question-------------------------------------------------//

describe('#Post Question', function() {

    it('should Post questions', function(done) {

        var arr = {question: 'What is mocha?',
            Dates: '2016-05-02 00:00:00',
            Type: 'General',
            explation: 'hi'};
        appNodeObj.postForumquestion(arr).then(function(result) {
            console.log(result);

            expect(result).to.be.not.be.undefined;

            done();

            expect(err).to.be.null;
            done();
        }).done();
    });

    it('error', function(done) {

        var arr = {
            Dates: '2016-05-02 00:00:00',
            Type: 'General',
            explation: 'hi'};
        appNodeObj.postForumquestion(arr).then(function(result) {
            console.log(result);
            expect(result).to.be.not.be.undefined;
            done();
        },function(err) {
            expect(err).to.be.null;
            done();
        }).done();

    });
});

//--------------------Insert Answer----------------------------------------------//

describe('#Insert Answer',function() {

    it('insert Data',function(done) {

        var data =
        {
            qusId: 10,

            Date: '2016-05-02 00:00:00',

            Comment: 'helo'
        };

        appNodeObj.postForumAnswer(data).then(function(result) {

            console.log(result);
            expect(result).to.be.not.null;
            assert.isOk('everything', 'everything is ok');
            done();

        },function(err) {
            console.log(err);
            expect(err).to.be.null;
            done();
        }).done();

    });

    it('insert Data',function(done) {

        var data =
        {
            qusId: 'hi',

            Date: '2016-05-02 00:00:00',

            Comment: 'helo'
        };

        appNodeObj.postForumAnswer(data).then(function(result) {

            console.log(result);
            expect(result).to.be.null;
            assert.isOk('everything', 'everything is ok');
            done();

        },function(err) {
            console.log(err);
            expect(err).to.be.not.null;
            done();
        }).done();


    });
});
//--------------------End---------------------------------------------------------//



// //--------------------Get Rating-------------------------------------------------//

describe('#Post Rating', function() {

    it('should post Rating', function(done) {

        var data = [1,4];

        appNodeObj.postForumRating(data).then(function(result) {

            expect(result).to.be.not.null;
            assert.isOk('everything', 'everything is ok');
            done();

        },function(err) {
            expect(err).to.be.not.null;
            done();
        }).done();

    });

    it('should post Rating', function(done) {

        var data = ['ddd',4];

        appNodeObj.postForumRating(data).then(function(result) {
            //console.log(result);
            expect(result).to.be.null;
            //Chai.request(server)
            //.post('/rating')
            //.send(data)
            //.end(function(err,res) {
            //expect(err).to.be.null;
            assert.isOk('everything', 'everything is ok');
            done();//

            ///});

        },function(err) {
            expect(err).to.be.not.null;
            done();
        }).done();



    });
});


describe('#select Queston and answer',function() {
    it('Expecet Question and answer', function (done) {
        appNodeObj.getForum('All').then(function (result) {
            expect(result).to.be.not.null;
            console.log(result);
            done();
        }, function (err) {
            expect(err).to.be.null;
            done();
        }).done();
    });
    it('Expecet Question and answer', function (done) {
        appNodeObj.getForum('General').then(function (result) {
            expect(result).to.be.not.null;
            console.log(result);
            done();
        }, function (err) {
            expect(err).to.be.null;
            done();
        }).done();
    });
    it('Expecet Question and answer', function (done) {
        appNodeObj.getForum('News list').then(function (result) {
            expect(result).to.be.not.null;
            done();
        }, function (err) {
            expect(err).to.be.null;
            done();
        }).done();
    });
    // it('Expecet Question and answer', function (done) {
    //     appNodeObj.getForum('helo').then(function (result) {
    //         expect(result).to.be.not.null;
    //         done();
    //     }, function (err) {
    //         expect(err).to.be.undefined;
    //         done();
    //     }).done();
    // });
});


// --------------------end--------------------------------------------------------//
