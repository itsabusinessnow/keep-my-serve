import passport from 'passport';
import mongoose from 'mongoose';

const Account = mongoose.model('Account');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/v1/auth/google/callback',
    },
    async function (accessToken, refreshToken, profile, done) {
      const organisation = '58c03ac18060197ca0b52d51';
      try {
        let account = await Account.findOne({
          googleUserId: profile.id,
          organisations: organisation,
        });

        if (!account)
          account = await new Account({
            googleUserId: profile.id,
            name: profile.displayName,
            organisations: [organisation],
          }).save();

        return done(null, account);
      } catch (err) {
        return done(err, {});
      }

      // Account.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return done(err, {});
      // });
      // console.log({ accessToken, refreshToken, profile });
      // return done(null, {
      //   name: profile.displayName,
      // });
    }
  )
);
