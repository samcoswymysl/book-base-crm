const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: String,
  authors: Array,
  coverSrc: String,
  isbn_10: String,
  isbn_13: String,
  description: String,
  edition_key: Array,
  fromBase: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('Book', BookSchema);
