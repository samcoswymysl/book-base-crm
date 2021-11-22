const express = require('express');
const { hash } = require('bcrypt');

const User = require('../models/User');

const registerRouter = express.Router();

registerRouter.post('/', async (req, res) => {
  const { name, password } = req.body;
  try {
    const hashPassword = await hash(password, 10);
    const user = new User({
      name: name.toLowerCase(),
      password: hashPassword,
    });

    await user.save((er) => {
      if (er) {
        const message = (er.code === 11000) ? 'User Alredy Exist' : 'Error, try later';
        console.log(er);

        res.status((er.code === 11000) ? 409 : 500);
        return res.json({ message });// todo Add handleerros
      }
      res.status(201);
      res.json({ message: 'Your account has been created' });
    });
  } catch (er) {
    res.status(500);
    res.json({ message: 'Error, try later' });
  }
});

module.exports = {
  registerRouter,
};
