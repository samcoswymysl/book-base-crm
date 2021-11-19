const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

const { homeRouter } = require( './routes/home');
const { booksRouter } = require('./routes/books');
const { registerRouter } = require('./routes/register');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/', homeRouter);
app.use('/books', booksRouter);
app.use('/register', registerRouter);

mongoose.connect(process.env.DB_CONECTION.toString(), () => {
  console.log('Connect db mongos');
});

app.listen(3000, 'localhost', () => {
  console.log('Serwer listen on http://localhost:3000');
});
