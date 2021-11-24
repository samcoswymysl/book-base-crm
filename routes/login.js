const express = require('express');
const jtw = require('jsonwebtoken');
const checkLogData = require('../middlewares/checkUserLogin');

const loginRouter = express.Router();

loginRouter.post('/',(req, res, next) => {
  const { user } = req;
  try {
    // TODO add time how you can use the token

    const token = jtw.sign({ id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '3600s' });

    res.cookie('auth', ` Bearer ${token}`, {
      path: 'http://localhost:8080',
      maxAge: 1000 * 60 * 60, // todo add maxAge cookies
    });

    res.cookie('userName', user.name, { maxAge: 1000 * 60 * 60 });
    return res.json({ status: 200, massage: 'Login successful' });
  } catch (e) {
    res.json(e.message);
  }
});

module.exports = {
  loginRouter,
};
