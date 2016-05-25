/**
 * Created by CSS on 25-05-2016.
 */
var passport = require('passport');

var configAuth = require('../config/auth');

var facebookStrategy = require('passport-facebook').Strategy;

var googleStrategy = require('passport-google-oauth2').Strategy;

var personaldataManager = require('../config/db/personaldataManager');

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(new facebookStrategy({
        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL,
        profileFields: ['id', 'displayName', 'photos', 'email'],
        passReqToCallback: true
    },
    function (req, accessToken, refreshToken, profile, done) {
        personaldataManager.updateFacebookPersonalData(req, profile, accessToken)
            .then(function (results) {
                if (results) {
                    req.session.data = results[0];
                    return done(null, results);
                }
            })
            .fail(function (err) {
                console.error(JSON.stringify(err));
            });
    }

));

passport.use(new googleStrategy({
        clientID: configAuth.googleAuth.clientID,
        clientSecret: configAuth.googleAuth.clientSecret,
        callbackURL: configAuth.googleAuth.callbackURL
    },
    function (accessToken, refreshToken, profile, done) {
        personaldataManager.updateGooglePersonalData(null, profile, accessToken)
            .then(function (results) {
                if (results) {
                    return done(null, results);
                } else {
                    return done(null);
                }
            })
            .fail(function (err) {
                console.error(JSON.stringify(err));
                return done(null);
            });
    }

));

exports.getPersonalData = function (req,res) {
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
};

exports.updatePersonalData = function (req,res) {
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
};

exports.connectFacebookAccount = function (req,res) {
    passport.authenticate('facebook', {scope: ['email', 'user_friends', 'manage_pages', 'user_hometown']});
};

exports.connectFacebookCallback = function (req,res) {
    passport.authenticate('facebook', { successRedirect: '/userProfile', failureRedirect: '/' });
};

exports.connectGoogleAccount = function (req,res) {
    passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/plus.login',
        'https://www.googleapis.com/auth/plus.profile.emails.read'] })
};

exports.connectGoogleCallback = function (req,res) {
    passport.authenticate('google', { successRedirect: '/userProfile',
        failureRedirect: '/' })
};
