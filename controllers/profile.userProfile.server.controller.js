/**
 * Created by CSS on 25-05-2016.
 */
var passport = require('passport');

var configAuth = require('../config/auth');

var facebookStrategy = require('passport-facebook').Strategy;

var googleStrategy = require('passport-google-oauth2').Strategy;

var personaldataManager = require('../config/db/personaldataManager');

var express = require('express');

var router = express.Router();

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new facebookStrategy({
  clientID: configAuth.facebookAuth.clientID,
  clientSecret: configAuth.facebookAuth.clientSecret,
  callbackURL: configAuth.facebookAuth.callbackURL,
  profileFields: ['id', 'displayName', 'photos', 'email'],
  passReqToCallback: true
},
    function(req, accessToken, refreshToken, profile, done) {
      personaldataManager.updateFacebookPersonalData(req, profile, accessToken)
            .then(function(results) {
              if (results) {
                req.session.data = results[0];
                return done(null, results);
              }
            })
            .fail(function(err) {
              console.error(JSON.stringify(err));
            });
    }

));

passport.use(new googleStrategy({
  clientID: configAuth.googleAuth.clientID,
  clientSecret: configAuth.googleAuth.clientSecret,
  callbackURL: configAuth.googleAuth.callbackURL,
  passReqToCallback: true
},
    function(req,accessToken, refreshToken, profile, done) {
      personaldataManager.updateGooglePersonalData(req, profile, accessToken)
            .then(function(results) {
              if (results) {
                return done(null, results);
              } else {
                return done(null);
              }
            })
            .fail(function(err) {
              console.error(JSON.stringify(err));
              return done(null);
            });
    }

));

router.get('/getPersonalData', function(req,res) {
  if ((req.session.data && req.session.data.id) || (req.session.passport)) {
    if (req.session.passport) {
      req.session.data = [];

      req.session.data.id = req.session.passport.user[0].id;
    }

    personaldataManager.getPersonalData(req.session.data.id)
            .then(function(results) {
              if (results) {
                req.session.data = results[0];
                res.send(results[0]);
              }
            })
            .fail(function(err) {
              console.error(JSON.stringify(err));
            });
  } else {
    return;
  }
});

router.post('/updatePersonalData', function(req,res) {
  if (req.session.data && req.session.data.id) {
    personaldataManager.updatePersonalData(req.body)
            .then(function(results) {
              if (results) {
                res.send(results);
              }
            })
            .fail(function(err) {
              console.error(JSON.stringify(err));
            });
  } else {
    return;
  }
});

router.get('/google', passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.profile.emails.read']}));

router.get('/google/callback',
    passport.authenticate('google', { successRedirect: '/profile/dashboard',
        failureRedirect: '/' }));

router.get('/facebook', passport.authenticate('facebook', {scope: ['email', 'user_friends', 'manage_pages', 'user_hometown']}));

router.get('/facebook/callback',
    passport.authenticate('facebook', { successRedirect: '/profile/dashboard',
        failureRedirect: '/' }));

module.exports = router;