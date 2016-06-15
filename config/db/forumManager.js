/**
 * Created by Java-android on 26.05.2016.
 */


var q = require('q');
var mysql = require('mysql');
var data = '';
var db = require('./../db');
var con = mysql.createConnection(db);

function getForum(type) {

  var deferred = q.defer();
  var questions = [];
  var getQus = '';

  if (type === 'All') {
    getQus = 'select q.*, (select round(AVG(rating)) from rating where qusId=q.qusId) as rating from question as q order by qusId DESC';
    console.log(getQus);
  } else {
    getQus = 'select * from question where Type=\'' + type + '\' order by qusId DESC ';
  }

          con.query(getQus, function(err, result) {

            if (err) {
              deferred.reject(err);
              throw err;
            }

            if (result) {
              data = result;

              console.log(JSON.stringify(data[0]));

              console.log(JSON.stringify(data.length));

              data.forEach(function(value, index) {
                console.log(value);

                var get = 'select * from answer where qusId=' + value.qusId + ' order by id DESC';

                console.log('get answer query' + get);

                con.query(get, function(err, results) {
                  if (err) {
                    deferred.reject(err);
                    throw err;
                  }

                  console.log(results);
                  if (results) {
                    value.answers = results;

                    console.log('value' + JSON.stringify(value));

                    questions.push(value);

                    if ((index + 1) >= data.length) {
                      deferred.resolve(questions);
                    }

                  }
                });
              });
            }
          });
  return deferred.promise;

}

function postForumquestion(forumData,userid) {
  var deferred = q.defer();
          con.query('INSERT INTO question(Question,Dates,Type,Explation) values(\'' + forumData.question + '\',now(),\'' + forumData.Type + '\',\'' + forumData.explation + '\')', function(err, result) {
            if (err) {
              console.log(err);
              deferred.reject(err);
            } else {
              console.log('Successfully');
              deferred.resolve(result);
            }
          });

  return deferred.promise;
}

function postForumAnswer(forumData) {
  var deferred = q.defer();

          var qry = 'INSERT INTO answer(qusId,Date,Answers)values(' + forumData.qusId + ',now(),\'' + forumData.comment + '\')';

          console.log('Post Answer Query --->' + qry);

          con.query(qry, function(err, result) {
            if (err) {
              console.log('Error when get postAnswer data : ' + err);
              deferred.reject(err);
            } else {
              console.log(result);
              deferred.resolve(result);
            }
          });
  return deferred.promise;
}

function postForumRating(rating) {
  var deferred = q.defer();

          con.query('insert into Rating(qusId,rating) values(' + rating.qusId + ',' + rating.star + ')', function(err, result) {
            console.log('insert into Rating(qusId,rating) values(' + rating.qusId + ',' + rating.star + ')');
            if (err) {
              console.log(err);
              deferred.reject(err);
            } else {
              console.log('Successfully');
              deferred.resolve({affectedRows: result.affectedRows});
            }
          });
  return deferred.promise;
}

module.exports = {
  getForum: getForum,
  postForumquestion: postForumquestion,
  postForumAnswer: postForumAnswer,
  postForumRating: postForumRating
};
