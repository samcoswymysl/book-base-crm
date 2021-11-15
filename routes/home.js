const express = require('express');
const Book = require("../models/Book");

const homeRouter = express.Router();

homeRouter.get('/', async (req, res, c) => {
  try {
    const books = await Book.find();
    const books2 = await books.map((el) => ({
      id: el._id.toHexString(),
      title: el.title,
      isbn: el.isbn,
    }));
    console.log(books2);

    res.render('home/home', {
      books2,
    });
  } catch (er) {
    res.json(er.message);
  }
});

module.exports = {
  homeRouter,

};
