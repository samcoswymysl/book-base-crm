const express = require('express');
const mongoose = require('mongoose');
const { hash, compare } = require('bcrypt');

const User = require('../models/User');

const registerRouter = express.Router();

registerRouter.post('/', async (req, res) => {
  const { name, password } = req.body;
  try {
    hash(password, 10, async (err, hash) => {
      if (err) {
        throw new Error('Poroblem becrypt');
      }
      const user = new User({
        name: name.toLowerCase(),
        password: hash,
      });

      await user.save((er) => {
        if (er) { // check error
          const message = (er.code === 11000) ? 'User Alredy Exist' : 'Error, try later';
          res.status((er.code === 11000) ? 409 : 500);
          return res.json({ message });
        }
        res.status(201);
        res.json({ message: 'Your account has been created' });
      });
    });
  } catch (er) {
    res.status(500);
    res.json({ message: 'Error, try later' });
  }
});

module.exports = {
  registerRouter,
};
