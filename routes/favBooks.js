const express = require('express');

const logController = require('../middlewares/auth');
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
      res.json(e.message);
    }
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
  .delete('/', logController, async (req, res) => {
    const { id } = req.user;
    const { book } = req.body;

    try {
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new Error('Your ID have wrong format ');
      }

      const user = await User.findByIdAndUpdate({ _id: id }, {
        $pull: {
          favBooks: { edition_key: book.edition_key },
        },
      });
      res.json(user.favBooks);
    } catch (e) {
      res.json(e.message);
    }
  });

module.exports = {
  favBooksRouter,
};
