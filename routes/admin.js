const express = require('express');
const User = require('../models/User'); const { loginRouter } = require('./login');

const adminRouter = express.Router();

adminRouter
  .get('/', (req, res, next) => {
    try {
      res.json('Welcome in admin panel');
    } catch (er) {
      next(er);
    }
  });

module.exports = {
  adminRouter,
};
