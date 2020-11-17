import passport from 'passport';

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/v1/auth/google/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      //  User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //    return done(err, user);
      //  });
      // console.log({ accessToken, refreshToken, profile });
      return done(null, {
        name: profile.displayName,
      });
    }
  )
);
