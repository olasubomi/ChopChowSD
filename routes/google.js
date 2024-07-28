const express = require('express');
const router = express.Router();

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "https://www.chopchowserver.vercel.app/renderEJS"//"http://www.example.com/auth/google/callback"
},
  function (accessToken, refreshToken, profile, done) {
    const newUser = User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });

    if (newUser) {
      const validUser = findOne(newUser._id);
      User.findOneAndUpdate({ _id: validUser._id }, {
        $set: {
          email_verified: true,
          isVerified: true
        }
      }, { new: true });
      return;
    }
  }

));

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google

//   will redirect the user back to this application at /auth/google/callback
router.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/');
  });
module.exports = router;