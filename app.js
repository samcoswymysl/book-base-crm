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
const { userRouter } = require('./routes/users');

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

app.use('/books', logController, booksRouter);
app.use('/register', registerRouter);
app.use('/login', checkLogData, loginRouter);
app.use('/fav', logController, favBooksRouter);
app.use('/logout', logoutRouter);
app.use('/admin', checkAdmin, adminRouter);
app.use('/users', checkAdmin, userRouter);

// Errors
app.use(handleError);

app.listen(3000, 'localhost', () => {
  console.log('Serwer listen on http://localhost:3000');
});

const line = 181 + 44 + 13 + 48 + 104 + 72 + 37 + 51 + 115 + 97 + 49 + 121 + 116 + 50 + 230 + 32 + 147 + 1 + 40 + 90 + 118 + 43 + 166 + 43 + 14 + 36 + 65 + 5 + 5 + 5 + 74 + 16 + 24 + 17 + 129 + 64 + 30 + 16 + 35 + 84 + 50;

const char = 3586 + 672 + 110 + 760 + 1856 + 1342 + 619 + 948 + 2275 + 1709 + 813 + 2302 + 1933 + 786 + 6182 + 844 + 3837 + 51 + 932 + 1785 + 2141 + 698 + 3395 + 586 + 298 + 664 + 1714 + 157 + 155 + 157 + 1745 + 315 + 394 + 343 + 2711 + 1368 + 774 + 303 + 805 + 1998 + 1695;

console.log({line, char})
