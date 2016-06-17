var express = require('express');

var forumConfig = require('../config/db/forumManager');

var router = express.Router();

router.get('/getForum', function(req, res) {
    forumConfig.getForum(req.query.type)
      .then(function(results,error) {
        if (results) {
          res.send(results);
        }
      });
  });

router.post('/postForumquestion', function(req, res) {
    forumConfig.postForumquestion(req.body,req.session.data.userid)
      .then(function(results,error) {
        if (results) {
          res.send(results);
        }
      });
  });

router.post('/postAnswer', function(req, res) {
    forumConfig.postForumAnswer(req.body,req.session.data.userid)
      .then(function(results,error) {
        if (results) {
          res.send(results);
        }
      });

  });

router.post('/rating', function(req, res) {
    forumConfig.postForumRating(req.body)
      .then(function(results,error) {
        if (results) {
          res.send(results);
        }
      });
  });

module.exports = router;

