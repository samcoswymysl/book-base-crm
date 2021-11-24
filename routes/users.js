const express = require('express');
const { hash } = require('bcrypt');

const User = require('../models/User');
const { WrongMongoId, EmptyDoc, DelleteEr } = require('../config/errors');

const userRouter = express.Router();

userRouter
  .get('/', async (req, res, next) => {
    try {
      const users = await User.find();
      const mapUsers = await users.map((el) => ({
        id: el._id.toHexString(),
        name: el.name,
        admin: el.admin,
      }));

      const sortUsers = mapUsers.sort((a, b) => b.admin - a.admin);

      res.json(sortUsers);
    } catch (er) {
      next(er);
    }
  })
  .put('/', async (req, res, next) => {
    const { id, admin, name } = req.body.user;
    try {
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new WrongMongoId();
      }

      await User.updateOne({ _id: id }, {
        admin: !admin,
      });

      res.json({ massage: `${name} now ${!admin ? 'is' : 'isn\'t'} admin` });
    } catch (er) {
      next(er);
    }
  })
  .patch('/', async (req, res, next) => {
    const { id, name } = req.body.user;
    try {
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new WrongMongoId();
      }
      const resetPass = await hash('resetPassword', 10);

      await User.updateOne({ _id: id }, {
        password: resetPass,
      });

      res.json({ massage: `The ${name} user's password has been reset` });
    } catch (er) {
      next(er);
    }
  })
  .delete('/', async (req, res, next) => {
    try {
      const AdminId = req.user.id;
      const { id, name } = req.body.user;

      if (AdminId === id) {
        throw new DelleteEr();
      }

      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new WrongMongoId();
      }

      const deleteUser = await User.deleteOne({ _id: id });
      if (deleteUser.deletedCount === 0) {
        throw new EmptyDoc();
      }
      res.json({ message: `${name} is deleted` });
    } catch (er) {
      next(er);
    }
  });

module.exports = {
  userRouter,
};
