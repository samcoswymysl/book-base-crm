import mongoose from 'mongoose';

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

export default BookSchema;
