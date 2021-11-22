const express = require('express');
const mongoose = require('mongoose');
const Book = require('../models/Book');

const booksRouter = express.Router();

/* TODO ADD new extends class ERROR */
/* TODO change res.json to res.render */

booksRouter

  .get('/', async (req, res) => {
    console.log('jestem tutaj');
    try {
      const books = await Book.find();
      const books2 = await books.map((el) => ({
        id: el._id.toHexString(),
        title: el.title,
        isbn: el.isbn,
      }));
      console.log(books2);

      res.render('home', {
        books2,
      });
    } catch (er) {
      res.json(er.message);
    }
  })

// find  book use title, one or more

  .get('/title/:title?', async (req, res) => {
    try {
      const book = await Book.find({ title: req.params.title.toLowerCase() });
      res.json(book);
    } catch (er) {
      res.json(er.message);
    }
  })

// find All use ISBN number

  .get('/isbn/:isbn?', async (req, res) => {
    try {
      const { isbn } = req.params;
      console.log(typeof isbn);
      const isbnNum = Number(isbn);
      if (isNaN(isbnNum)) {
        throw new Error('ISBN must be a number');
      }

      const book = await Book.find({ isbn: isbnNum });
      res.json(book);
    } catch (er) {
      res.json(er.message);
    }
  })

// find one book for id
  .get('/id/:id?', async (req, res) => {
    try {
      const { id } = req.params;
      // if check ID
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new Error('ID have wrong format ');
      }

      const book = await Book.findById(id);
      res.json(book);
    } catch (er) {
      res.json(er.message);
    }
  })

// Add one book to db

  .post('/', async (req, res) => {
    const { title, isbn } = req.body;
    const book = new Book({
      title: title.toLowerCase(),
      isbn,
    });

    try {
      const savedBook = await book.save();
      res.json(savedBook);
    } catch (err) {
      res.json(er.message);
    }
  })

  .delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
      // check format id
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new Error('ID have wrong format ');
      }

      const book = await Book.deleteOne({ _id: id });

      // if delete count === 0 in any r4ecorrds by this id
      if (book.deletedCount === 0) {
        throw new Error('I dont find this record in DB');
      }

      res.json(book);
    } catch (er) {
      res.json(er.message);
    }
  })
  .patch('/:id?', async (req, res) => {
    const { id } = req.params;
    const { title, isbn } = req.body;

    try {
      // check format id
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new Error('ID have wrong format ');
      }
      if (!title || !isbn) {
        throw new Error('Title and ISBN cannot be empty');
      }

      const book = await Book.updateOne({ _id: id }, {
        $set: {
          title: title.toLowerCase(),
          isbn,
        },
      });
      if (!book.matchedCount) {
        throw new Error('Cannot find this ID i DB');
      }

      res.json(book);
    } catch (er) {
      res.json(er.message);
    }
  });

module.exports = {
  booksRouter,
};
