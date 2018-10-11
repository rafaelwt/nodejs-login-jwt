var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User');
passport.use(new LocalStrategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]'
}, function(email, password, done) {

    if(email != 'admin' && passport !='sudo' ){
      return done(null, false, {errors: {'usuario or password': 'is invalid'}});
    }
    console.log("usuario passport.js")

    var user = new User("rafaelwt");

    return done(null, user);

}));

