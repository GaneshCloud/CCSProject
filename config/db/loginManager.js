/**
 * Created by greg on 2015.10.11..
 */
var mysql = require('mysql');
var q = require('q');
var db = require('./../db');
var connectionManager = require('./connectionManager');
var con = mysql.createConnection(db);

function getUserValidity(userid, password) {
  var deferred = q.defer();
   con.query('SELECT * FROM personaldata where userid = \'' + userid + '\' and password = \'' + password + '\' and status = \'active\'', function(error, results) {
    if (error) {
      console.error(error);
      deferred.reject(error);
    }
    deferred.resolve(results);
  });
  return deferred.promise;
}

module.exports = {
  getUserValidity: getUserValidity
};
