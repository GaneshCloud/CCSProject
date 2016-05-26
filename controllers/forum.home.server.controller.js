var express = require('express');

var forumConfig = require('../config/db/forumManager');

var router = express.Router();

//
// router.get('/home', function(req, res) {
//   {
//     res.sendfile('./public/forum/home/forum.html');
//   }
// });




router.get('/getForum', function(req, res) {
    forumConfig.getForum(req.query.type)
      .then(function(results,error) {
        if (results) {
          res.send(results);
        } else {
          console.error(error);
        }
      })
      .fail(function(err) {
        console.error(JSON.stringify(err));
      });
  });


router.post('/postForumquestion', function(req, res) {
    forumConfig.postForumquestion(req.body,req.session.data.userid)
      .then(function(results,error) {
        if (results) {
          res.send(results);
        } else {
          console.error(error);
        }
      })
      .fail(function(err) {
        console.error(JSON.stringify(err));
      });
  });

router.post('/postAnswer', function(req, res) {
    forumConfig.postForumAnswer(req.body)
      .then(function(results,error) {
        if (results) {
          res.send(results);
        } else {
          console.error(error);
        }
      })
      .fail(function(err) {
        console.error(JSON.stringify(err));
      });
  });

router.post('/rating', function(req, res) {
    forumConfig.postForumRating(req.body)
      .then(function(results,error) {
        if (results) {
          res.send(results);
        } else {
          console.error(error);
        }
      })
      .fail(function(err) {
        console.error(JSON.stringify(err));
      });
  });

module.exports = router;

