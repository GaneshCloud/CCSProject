/**
 * Created by Java-android on 26.05.2016.
 */


var q = require('q');
var data = '';
var ConfigManager = require('./connectionManager');

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
  ConfigManager.getConnection()
        .then(function(connection) {
          connection.query(getQus, function(err, result) {

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

                connection.query(get, function(err, results) {
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
        });
  return deferred.promise;

}

function postForumquestion(forumData,userid) {
  var deferred = q.defer();
  ConfigManager.getConnection()
        .then(function(connection) {

          connection.query('INSERT INTO question(Question,Dates,Type,Explation,userid) values(\'' + forumData.question + '\',now(),\'' + forumData.Type + '\',\'' + forumData.explation + '\',\'' + userid + '\')', function(err, result) {
            if (err) {
              console.log(err);
              deferred.reject(err);
            } else {
              console.log('Successfully');
              deferred.resolve(result);
            }
          });
        });

  return deferred.promise;
}

function postForumAnswer(forumData) {
  var deferred = q.defer();
  ConfigManager.getConnection()
        .then(function(connection) {

          var qry = 'INSERT INTO answer(qusId,Date,Answers)values(' + forumData.qusId + ',now(),\'' + forumData.Comment + '\')';

          console.log('Post Answer Query --->' + qry);

          connection.query(qry, function(err, result) {
            if (err) {
              console.log('Error when get postAnswer data : ' + err);
              deferred.reject(err);
              return;
            } else {
              console.log(result);
              deferred.resolve(result);
            }
          });
        })
        .fail(function(err) {
          console.error(JSON.stringify(err));
          deferred.reject(err);
        });
  return deferred.promise;
}

function postForumRating(ratingArr) {
  var deferred = q.defer();
  ConfigManager.getConnection()
        .then(function(connection) {

          connection.query('insert into Rating(qusId,rating) values(' + ratingArr[0] + ',' + ratingArr[1] + ')', function(err, result) {
            console.log('insert into Rating(qusId,rating) values(' + ratingArr[0] + ',' + ratingArr[1] + ')');
            if (err) {
              console.log(err);
              deferred.reject(err);
            } else {
              console.log('Successfully');
              deferred.resolve({affectedRows: result.affectedRows});
            }
          });
        })
        .fail(function(err) {
          console.error(JSON.stringify(err));
          deferred.reject(err);
        });
  return deferred.promise;
}

module.exports = {
  getForum: getForum,
  postForumquestion: postForumquestion,
  postForumAnswer: postForumAnswer,
  postForumRating: postForumRating
};
