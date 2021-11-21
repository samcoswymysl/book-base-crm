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
        res.json('błąd');
      }
      if (!user) {
        return res.json(info.message);
      }
      req.login(user, { session: false }, (er) => {
        if (er) {
          return res.json(er.message);
        }
        const token = jtw.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 122200 });
        console.log(token);
        res.header('Authorization', token);
        return res.json(token);
      });
    })(req, res, next);
  } catch (e) {
    res.json(e.message);
  }
});

module.exports = {
  loginRouter,
};
