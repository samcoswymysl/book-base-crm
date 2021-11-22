const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  book: {
    title: String,
    coverSrc: String,
    bookEditionKey: {
      type: String,
      // unique: true,
    },
  },
});

module.exports = mongoose.model('Book', BookSchema);
