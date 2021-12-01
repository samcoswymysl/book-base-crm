const dotenv = require('dotenv');

dotenv.config({ path: '.env' });
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const { booksRouter } = require('./routes/books');
const { registerRouter } = require('./routes/register');
const { loginRouter } = require('./routes/login');
const { favBooksRouter } = require('./routes/favBooks');
const { passport } = require('./config/passport');
const { logoutRouter } = require('./routes/logout');
const { adminRouter } = require('./routes/admin');
const { userRouter } = require('./routes/users');

const { handleError } = require('./middlewares/handleError');
const logController = require('./middlewares/auth');
const checkLogData = require('./middlewares/checkUserLogin');
const checkAdmin = require('./middlewares/accesAdminPanel');

const app = express();

mongoose.connect(process.env.DB_CONECTION.toString(), () => {
  console.log('Connect db mongos');
});
app.use(express.static('public'));
app.use(passport.initialize());
app.use(express.json());
app.use(bodyParser.json());

app.use('/books', booksRouter);
app.use('/register', registerRouter);
app.use('/login', checkLogData, loginRouter);
app.use('/fav', logController, favBooksRouter);
app.use('/logout', logoutRouter);
app.use('/admin', checkAdmin, adminRouter);
app.use('/users', checkAdmin, userRouter);

// Errors
app.use(handleError);

// handle production

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '/public/')));

  app.get(/.*/, (req, res) => res.sendFile(path.resolve(__dirname, '/public/index.html')));
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listen on ${port}`);
});
