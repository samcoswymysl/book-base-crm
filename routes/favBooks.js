const express = require('express');
const mongoose = require('mongoose');

const logController = require('../middlewares/auth'); const Book = require('../models/Book');
const User = require('../models/User');

const favBooksRouter = express.Router();

favBooksRouter
  .get('/', logController, async (req, res) => {
    const { id } = req.user;

    try {
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new Error('Your ID have wrong format ');
      }

      const user = await User.findById(id);
      res.json(user.favBooks);
    } catch (e) {
      console.log(e.message);
    }

    // console.log(req.user._id);
    res.json('zalogowany');
  })
  .put('/', logController, async (req, res) => {
    const { id } = req.user;
    const { book } = req.body;

    try {
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new Error('Your ID have wrong format ');
      }

      const user = await User.updateOne({ _id: id }, {
        $addToSet: {
          favBooks: book,
        },
      });
      if (!user.matchedCount) {
        throw new Error('Cannot find this ID i DB');
      }

      res.json(`${book.title} add to your favorite books`);
    } catch (e) {
      res.json(e.message);
    }
  })
  .delete('/');

module.exports = {
  favBooksRouter,
};
