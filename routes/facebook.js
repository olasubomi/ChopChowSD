const express = require("express");
const router = express.Router();

var passport = require("passport"),
  FacebookStrategy = require("passport-facebook").Strategy;

passport.use(
  new FacebookStrategy(
    {
      clientID: "process.env.FACEBOOK_APP_ID",
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "https://www.chopchowserver.vercel.app/renderEJS",
    },
    function (accessToken, refreshToken, profile, done) {
      const newUser = User.findOrCreate(function (err, user) {
        if (err) {
          return done(err);
        }
        done(null, user);

      });
      if (newUser) {
        const validUser =  findOne(newUser._id);
        User.findOneAndUpdate({ _id: validUser._id }, { is_verified: true }, { new: true });
        return;
      }
    }
  )
);

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
router.get("/auth/facebook", () => {
  passport.authenticate("facebook");
});

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/renderEJS",
    failureRedirect: "/",
  })
);

module.exports = router;
