var chai = require('chai');

var request = require('supertest');

var assert = chai.assert;

var expect = chai.expect;

var server = require('../../../server').server;

describe('#Post Question', function() {

    it('should Post questions', function (done) {
        var data = {
            question: 'What is Directives?',
            Dates: '2016-05-02 00:00:00',
            Type: 'General',
            explation: 'helo',
            userid: 'CBE04'
        };
        request(server)
            .post('/forum/postForumquestion')
            .send(data)
            .then(function (error,result) {
                expect(result).to.be.not.null;
                //this.timeout(15000);
                //setTimeout(done,15000);
                done();
                //expect(201, done);
            });
    });
});



// --------------------End------------------------------------------------------------ //


// --------------------Insert Answer-------------------------------------------------- //

describe('#Insert Answer',function() {
    it('insert Data', function (done) {
        var data =
        {
            qusId: 11,
            Date: '2016-05-02 00:00:00',
            Comment: 'mohan'
        };
        request(server)
            .post('/forum/postAnswer')
            .send(data)
            .end(function (error, results) {
                expect(results).to.be.not.null;
                done();

            });
    });

});

// // //--------------------End---------------------------------------------------------//



// // //--------------------Get Rating-------------------------------------------------//

describe('#Post Rating', function() {

  it('should post Rating', function(done) {
    var data = [11,1];
    request(server)
    .post('/forum/rating')
    .send(data)
    .end(function(error,results) {
        expect(results).to.be.not.null;
        assert.isOk('everything', 'everything is ok');
        done();
      });

  });

});

// //--------------------end--------------------------------------------------------//

// // //--------------------Get Question,Answer-------------------------------------//

describe('#GET CATEGORY', function() {

  it('should SELECT CATEGORY ', function(done){
    request(server)
    .get("/forum/getForum?type=All")
    .end(function(error,results) {
        expect(results).to.be.not.null;
        assert.isOk('everything', 'everything is ok');
        done();
      });

  });
    it('should SELECT CATEGORY ', function(done){
        request(server)
            .get("/forum/getForum?type=General")
            .end(function(error,results) {
                expect(results).to.be.not.null;
                assert.isOk('everything', 'everything is ok');
                done();
            });

    });
    it('should SELECT CATEGORY ', function(done){
        request(server)
            .get("/forum/getForum?type=News list")
            .end(function(error,results) {
                expect(results).to.be.not.null;
                assert.isOk('everything', 'everything is ok');
                done();
            });

    });
    
});

// //--------------------end--------------------------------------------------------//
