const express = require('express');
const Book = require('../models/Book');
const {
  WrongISBN, EmptyDoc, WrongMongoId, EmptyValue,
} = require('../config/errors');

const checkAdmin = require('../middlewares/accesAdminPanel'); const { loginRouter } = require('./login');

const booksRouter = express.Router();

/* TODO ADD new extends class ERROR */

booksRouter

  .get('/', async (req, res, next) => {
    try {
      const books = await Book.find();
      res.json(books);
    } catch (er) {
      next(er);
    }
  })

// find  book use title, one or more

  .get('/title/:title?', async (req, res, next) => {
    const { title } = req.params;
    try {
      const book = await Book.find({ title: { $regex: title, $options: 'i' } });
      res.json(book);
    } catch (er) {
      next(er);
    }
  })

// Only for admin
// Add one book to db

  .post('/', checkAdmin, async (req, res, next) => {
    const {
      title, authors, coverSrc, edition_key, isbn_10, isbn_13, description,
    } = req.body.book;

    console.log(req.body);
    try {
      const newBook = new Book({
        title,
        authors,
        coverSrc,
        isbn_10,
        isbn_13,
        description,
        edition_key,

      });

      const savedBook = await newBook.save();
      res.json('Book Added');
    } catch (er) {
      next(er);
    }
  })

  .delete('/', checkAdmin, async (req, res, next) => {
    const { _id } = req.body.book;
    try {
      // check format id
      if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new WrongMongoId();
      }

      const book = await Book.deleteOne({ _id });

      // if delete count === 0 in any r4ecorrds by this id
      if (book.deletedCount === 0) {
        throw new EmptyDoc();
      }

      res.json(book);
    } catch (er) {
      next(er);
    }
  })
  .patch('/', checkAdmin, async (req, res, next) => {
    const { id } = req.params;
    const {
      _id, title, authors, coverSrc, edition_key, isbn_10, isbn_13, description,
    } = req.body.book;

    try {
      // check format id
      if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new WrongMongoId();
      }
      if (!title || !isbn_10) {
        throw new EmptyValue();
      }

      const book = await Book.updateOne({ _id }, {
        $set: {
          title,
          authors,
          coverSrc,
          isbn_10,
          isbn_13,
          description,
          edition_key,
        },
      });
      if (!book.matchedCount) {
        throw new EmptyDoc();
      }

      res.json(book);
    } catch (er) {
      next(er);
    }
  });

module.exports = {
  booksRouter,
};
