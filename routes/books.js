const express = require('express');
const mongoose = require('mongoose');
const Book = require('../models/Book');

const booksRouter = express.Router();

booksRouter
  .get('/', (req, res) => {
    res.send('boks');
  })
  .post('/', async (req, res) => {
    const { title, isbn } = req.body;
    const book = new Book({
      title,
      isbn,
    });


    //Zapisywanie w bazie
    book.save((err) => {
      if (err) {
        console.log(err);
      }

      res.send('zapisało się');
    });
  });

module.exports = {
  booksRouter,
};
