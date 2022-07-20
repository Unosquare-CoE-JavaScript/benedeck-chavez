const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("User");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    (request, accessToken, refreshToken, profile, cb) => {
      User.findOne({ googleId: profile.id }, (err, user) => {
        if (err) {
          cb(err); // handle errors!
        }
        if (!err && user !== null) {
          cb(err, user);
        } else {
          user = new User({
            googleId: profile.id,
            displayName: profile.displayName,
          });

          user.save((err) => {
            if (err) {
              cb(err); // handle errors!
            } else {
              cb(null, user);
            }
          });
        }
      });
    }
  )
);
