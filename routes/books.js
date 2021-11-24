const express = require('express');
const Book = require('../models/Book'); const
  {
    WrongISBN, EmptyDoc, WrongMongoId, EmptyValue,
  } = require('../config/errors');

const booksRouter = express.Router();

/* TODO ADD new extends class ERROR */

booksRouter

  .get('/', async (req, res, next) => {
    try {
      const books = await Book.find();
      const books2 = await books.map((el) => ({
        id: el._id.toHexString(),
        title: el.title,
        isbn: el.isbn,
      }));

      res.render('home', {
        books2,
      });
    } catch (er) {
      next(er);
    }
  })

// find  book use title, one or more

  .get('/title/:title?', async (req, res) => {
    try {
      const book = await Book.find({ title: req.params.title.toLowerCase() });
      res.json(book);
    } catch (er) {
      next(er);
    }
  })

// find All use ISBN number

  .get('/isbn/:isbn?', async (req, res, next) => {
    try {
      const { isbn } = req.params;
      const isbnNum = Number(isbn);
      if (isNaN(isbnNum)) {
        throw new WrongISBN();
      }

      const book = await Book.find({ isbn: isbnNum });
      res.json(book);
    } catch (er) {
      next(er);
    }
  })

// find one book for id
  .get('/id/:id?', async (req, res, next) => {
    try {
      const { id } = req.params;
      // if check ID
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new WrongMongoId();
      }

      const book = await Book.findById(id);
      res.json(book);
    } catch (er) {
      next(er);
    }
  })

// Add one book to db

  .post('/', async (req, res, next) => {
    const { title, isbn } = req.body;
    const book = new Book({
      title: title.toLowerCase(),
      isbn,
    });

    try {
      const savedBook = await book.save();
      res.json(savedBook);
    } catch (er) {
      next(er);
    }
  })

  .delete('/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
      // check format id
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new WrongMongoId();
      }

      const book = await Book.deleteOne({ _id: id });

      // if delete count === 0 in any r4ecorrds by this id
      if (book.deletedCount === 0) {
        throw new EmptyDoc();
      }

      res.json(book);
    } catch (er) {
      next(er);
    }
  })
  .patch('/:id?', async (req, res, next) => {
    const { id } = req.params;
    const { title, isbn } = req.body;

    try {
      // check format id
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new WrongMongoId();
      }
      if (!title || !isbn) {
        throw new EmptyValue();
      }

      const book = await Book.updateOne({ _id: id }, {
        $set: {
          title: title.toLowerCase(),
          isbn,
        },
      });
      if (!book.matchedCount) {
        throw new EmptyDoc()
      }

      res.json(book);
    } catch (er) {
      next(er);
    }
  });

module.exports = {
  booksRouter,
};
