const dotenv = require('dotenv');

dotenv.config({ path: '../.env' });
const express = require('express');
const passport = require('passport');
const jtw = require('jsonwebtoken');

const loginRouter = express.Router();

loginRouter.post('/', (req, res, next) => {
  try {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err) {
        throw new Error('Error');
      }
      if (!user) {
        return res.json(info.message);
      }
      req.login(user, { session: false }, (er) => {
        if (er) {
          return res.json(er.message);
        }
        const token = jtw.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '60s' }); //TODO add time how you can use the token
        console.log(token);
        res.cookie('auth', ` Bearer ${token}`, {
          path: 'http://localhost:8080',
          maxAge: 1000 * 60, //todo add maxAge cookies
        });
        return res.json('Login successful');
      });
    })(req, res, next);
  } catch (e) {
    res.json(e.message);
  }
});

module.exports = {
  loginRouter,
};
