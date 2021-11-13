const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  isbn: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Book', BookSchema);