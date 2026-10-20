const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: 'All fields are required.'
    });
  }

  try {
    const user = new User({
      name,
      email
    });

    user.setPassword(password);
    await user.save();

    return res.status(201).json({
      token: user.generateJWT()
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        message: 'That email is already registered.'
      });
    }

    return res.status(500).json({
      message: 'Unable to register user.'
    });
  }
};

const login = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      message: 'Email and password are required.'
    });
  }

  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({
        message: info?.message || 'Login failed.'
      });
    }

    return res.status(200).json({
      token: user.generateJWT()
    });
  })(req, res, next);
};

module.exports = {
  register,
  login
};