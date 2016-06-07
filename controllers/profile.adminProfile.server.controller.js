/**
 * Created by CSS on 25-05-2016.
 */
var personaldataManager = require('../config/db/personaldataManager');

exports.getUserDetails = function(req,res) {
  if (req.session.data) {
    personaldataManager.getUserDetails('user')
            .then(function(results) {
              if (results) {
                req.session.userDetails = results;
                res.send(results);
              }
            })
            .fail(function(err) {
              console.error(JSON.stringify(err));
            });
  } else {
    return;
  }
};