'use strict';

var router = require('express').Router();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var models = require('../../models');
var User = models.User;
var envVar = require('../../env');

console.log('env variables', envVar);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id)
  .then(function (user) {
    done(null, user);
  })
  .catch(done);
});

router.use(passport.initialize());

router.use(passport.session());

router.get('/', passport.authenticate('google', {
  scope: 'email'
}));

router.get('/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

passport.use(new GoogleStrategy({
  clientID: envVar.GOOGLE.clientID,
  clientSecret: envVar.GOOGLE.clientSecret,
  callbackURL: envVar.GOOGLE.callbackURL
}, function (token, refreshToken, profile, done) {
  var info = {
    name: profile.displayName,
    // google may not provide an email, if so we'll just fake it
    email: profile.emails ? profile.emails[0].value : [profile.username , 'fake-email.com'].join('@'),
    photo: profile.photos ? profile.photos[0].value : undefined
  };
  User.findOrCreate({
    where: {googleId: profile.id},
    defaults: info
  })
  .spread(function (user) {
    done(null, user);
  })
  .catch(done);
}));

module.exports = router;
