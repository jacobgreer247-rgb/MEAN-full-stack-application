const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.use('local', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      const user = await User.findOne({
        email: email.trim().toLowerCase()
      });

      if (!user || !user.validPassword(password)) {
        return done(null, false, {
          message: 'Incorrect email or password.'
        });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));