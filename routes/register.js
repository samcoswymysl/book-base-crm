const express = require('express');
const mongoose = require('mongoose');
const e = require('express');
const { encodePass, checkPass } = require('../utils/becrypt');

const User = require('../models/User');

const registerRouter = express.Router();

registerRouter.post('/', async (req, res) => {
  const { name, password } = req.body;
  const pa = await checkPass(password);
   await console.log(pa);

  const user = new User({
    name,
    password: encodePass(password),
  });

  // console.log(user);
  res.status(201);

  res.json('Your account has been created');
});

module.exports = {
  registerRouter,
};
