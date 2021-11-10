const express = require('express');
const hbs = require('express-handlebars');
const mongodbClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbname = 'booskDB';

mongodbClient.connect(url, {}, (error, client) => {
  if (error) {
    console.log('error');
  }

  console.log('ok');
});

const { homeRouter } = require('./routes/home');
const { booksRouter } = require('./routes/books');

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.engine('.hbs', hbs({
  extname: '.hbs',
  // helpers: handlebarsHelpers,
}));
app.set('view engine', '.hbs');

app.use('/', homeRouter);

app.listen(3000, 'localhost', () => {
  console.log('Serwer listen on http://localhost:3000');
});
