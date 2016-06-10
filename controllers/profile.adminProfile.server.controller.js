/**
 * Created by CSS on 25-05-2016.
 */
var personaldataManager = require('../config/db/personaldataManager');

exports.getUserDetails = function(req,res) {
    console.log("req.session.data"+JSON.stringify(req.session.data));
  if (req.session.data) {
    personaldataManager.getUserDetails('user')
            .then(function(results) {
              if (results) {
                req.session.userDetails = results;
                res.end(JSON.stringify(results));
              }
            });
  } else {
    return;
  }
};