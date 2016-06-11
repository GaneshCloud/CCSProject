/**
 * Created by CSS on 25-05-2016.
 */

var passport = require('passport');

var express = require('express');

var configAuth = require('../config/auth');

var facebookStrategy = require('passport-facebook').Strategy;

var googleStrategy = require('passport-google-oauth2').Strategy;

var loginManager = require('../config/db/loginManager');

var personalDataManager = require('../config/db/personaldataManager');

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
    function(req,accessToken, refreshToken, profile, done) {
      personalDataManager.updateFacebookPersonalData(req, profile, accessToken)
            .then(function(results) {
              if (results && results.length > 0) {
                req.session.data = results[0];
                return done(null, results);
              }
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
      personalDataManager.updateGooglePersonalData(req, profile, accessToken)
            .then(function(results) {
              if (results && results.length) {
                req.session.data = results[0];
                return done(null, results);
              } else {
                return done(null);
              }
            });
    }

));

router.post('/verifyUser',function(req,res) {
  loginManager.getUserValidity(req.body.user, req.body.password)
        .then(function(results) {
          if (results && (results.length > 0)) {
            req.session.data = results[0];
              console.log("req.session.data"+JSON.stringify(req.session.data));
            res.send(results[0]);
          }
        },function (error) {
            res.send(error);
        });
});

router.get('/facebook', passport.authenticate('facebook', {scope: ['email', 'user_friends', 'manage_pages', 'user_hometown']}));

router.get('/facebook/callback',
    passport.authenticate('facebook', { successRedirect: '/profile/dashboard',
        failureRedirect: '/' }));

router.get('/google', passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.profile.emails.read'] }));

router.get('/google/callback',
    passport.authenticate('google', { successRedirect: '/profile/dashboard',
        failureRedirect: '/' }));

module.exports = router;