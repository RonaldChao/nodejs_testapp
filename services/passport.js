const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done)=>{
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

// Google+ authentication
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: "/auth/google/callback"
  }, (accessToken, refreshToken, profile, done)=>{

      // Determine if a user exists
      User.findOne({googleID: profile.id}).then((existingUser)=>{
          if (existingUser){
            // User exists
            done(null, existingUser);
          }else{
            // Create a new user
            new User({googleID: profile.id}).save().then(user => done(null, user));

          }
      })
  })
);
