const express = require('express');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');
require('dotenv/config');
const bodyParser = require('body-parser');

const { homeRouter } = require('./routes/home');
const { booksRouter } = require('./routes/books');

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.json());
app.engine('.hbs', hbs({
  extname: '.hbs',
  // helpers: handlebarsHelpers,
}));
app.set('view engine', '.hbs');
app.use('/', homeRouter);
app.use('/books', booksRouter);

mongoose.connect(process.env.DB_CONECTION, { useNewUrlParser: true }, () => {
  console.log('Connect fb mongos');
});

app.listen(3000, 'localhost', () => {
  console.log('Serwer listen on http://localhost:3000');
});
