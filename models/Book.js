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
  img:
      {
        data: Buffer,
        contentType: String
      }
});

module.exports = mongoose.model('Book', BookSchema);
