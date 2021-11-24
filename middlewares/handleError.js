const {
  ShortPass, ShortLogin, WrongName, WrongPass, WrongMongoId, WrongISBN, EmptyDoc, NoFindBook,EmptyValue,
} = require('../config/errors');

function handleError(err, req, res, next) {
  const answer = {
    message: 'Sorry try later',
    status: 500,
  };
  if (err instanceof ShortLogin) {
    answer.message = 'Name must contain 2 characters';
    answer.status = 404;
  }
  if (err instanceof ShortPass) {
    answer.message = 'Password must contain 6 characters';
    answer.status = 404;
  }
  if (err.code === 11000) {
    answer.message = 'User already exist';
    answer.status = 409;
  }
  if (err instanceof WrongName) {
    answer.message = 'User dont exist';
    answer.status = 404;
  }
  if (err instanceof WrongPass) {
    answer.message = 'Incorrect password';
    answer.status = 404;
  }
  if (err instanceof WrongMongoId) {
    answer.message = 'Element ID is wrong.';
    answer.status = 404;
  }
  if (err instanceof WrongISBN) {
    answer.message = 'Wrong ISBN Number';
    answer.status = 404;
  }
  if (err instanceof EmptyDoc) {
    answer.message = 'Element don\'t exist';
    answer.status = 404;
  }
  if (err instanceof NoFindBook) {
    answer.message = 'We don\'t find this book';
    answer.status = 404;
  }
  if (err instanceof EmptyValue) {
    answer.message = 'You mast refill all fields';
    answer.status = 404;
  }

  console.log(err);
}

module.exports = {
  handleError,

};
