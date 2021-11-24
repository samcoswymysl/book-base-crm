const express = require('express');
const { hash } = require('bcrypt');

const User = require('../models/User');
const { ShortLogin, ShortPass } = require('../config/errors');

const registerRouter = express.Router();

registerRouter.post('/', async (req, res, next) => {
  try {
    const { name, password } = req.body;
    if (name.length < 2) {
      throw new ShortLogin();
    }
    if (password.length <= 6) {
      throw new ShortPass();
    }
    const hashPassword = await hash(password, 10);
    const user = new User({
      name: name.toLowerCase(),
      password: hashPassword,
      admin: false,
    });

    await user.save();
    res.status(201);
    res.json({ message: 'Your account has been created' });
  } catch (er) {
    next(er);
  }
});

module.exports = {
  registerRouter,
};
