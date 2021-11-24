const dotenv = require('dotenv');

dotenv.config({ path: '.env' });
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const { booksRouter } = require('./routes/books');
const { registerRouter } = require('./routes/register');
const { loginRouter } = require('./routes/login');
const { favBooksRouter } = require('./routes/favBooks');
const { passport } = require('./config/passport');
const { logoutRouter } = require('./routes/logout');
const { adminRouter } = require('./routes/admin');

const { handleError } = require('./middlewares/handleError');
const logController = require('./middlewares/auth');
const checkLogData = require('./middlewares/checkUserLogin');
const checkAdmin = require('./middlewares/accesAdminPanel');

const app = express();

mongoose.connect(process.env.DB_CONECTION.toString(), () => {
  console.log('Connect db mongos');
});
app.use(passport.initialize());
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:8080', // <-- location of the react app were connecting to
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));
app.use(bodyParser.json());

app.use('/books', booksRouter);
app.use('/register', registerRouter);
app.use('/login', checkLogData, loginRouter);
app.use('/fav', logController, favBooksRouter);
app.use('/logout', logoutRouter);
app.use('/admin', checkAdmin, adminRouter);

// Errors
app.use(handleError);

app.listen(3000, 'localhost', () => {
  console.log('Serwer listen on http://localhost:3000');
});
