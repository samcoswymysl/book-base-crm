const express = require('express');

const User = require('../models/User'); const { WrongMongoId } = require('../config/errors');

const favBooksRouter = express.Router();

favBooksRouter
  .get('/', async (req, res, next) => {
    const { id } = req.user;

    try {
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new WrongMongoId();
      }

      const user = await User.findById(id);
      res.json(user.favBooks);
    } catch (er) {
      next(er);
    }
  })
  .put('/', async (req, res, next) => {
    const { id } = req.user;
    const { book } = req.body;

    try {
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new WrongMongoId();
      }

      await User.updateOne({ _id: id }, {
        $addToSet: {
          favBooks: book,
        },
      });

      res.json({
        massage: `${book.title} add to your favorite books`,
      });
    } catch (er) {
      next(er);
    }
  })
  .delete('/', async (req, res, next) => {
    const { id } = req.user;
    const { book } = req.body;

    try {
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new WrongMongoId();
      }

      const user = await User.findByIdAndUpdate({ _id: id }, {
        $pull: {
          favBooks: { edition_key: book.edition_key },
        },
      });
      res.json(user.favBooks);
    } catch (er) {
      next(er);
    }
  });

module.exports = {
  favBooksRouter,
};
