import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import {} from 'dotenv/config';

import { homeRouter } from './routes/home.js';
import { booksRouter } from './routes/books.js';
import { registerRouter } from './routes/register.js';

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.json());

app.use('/', homeRouter);
app.use('/books', booksRouter);
app.use('/register', registerRouter);

mongoose.connect(process.env.DB_CONECTION.toString(), () => {
  console.log('Connect fb mongos');
});

app.listen(3000, 'localhost', () => {
  console.log('Serwer listen on http://localhost:3000');
});
