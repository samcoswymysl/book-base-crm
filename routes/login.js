const express = require('express');
const { compare } = require('bcrypt');

const User = require('../models/User');

const loginRouter = express.Router();

loginRouter.post('/', async (req, res) => {
  const { name, password } = req.body;

  try {
    const userFind = await User.findOne({ name: name.toLowerCase() });
    if (userFind === null) {
      throw new Error('This username don\' exist');
    }
    await compare(password, userFind.password, (err, passIsOk) => {
      if (!passIsOk) {
        throw new Error('Wrong password');
      }
      if (err) {
        return res.json('Error, try later');
      }
      res.json(`pass is ${passIsOk}`);
    });
  } catch (e) {
    res.json(e.message);
  }
});

module.exports = {
  loginRouter,
};
