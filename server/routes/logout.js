const expres = require('express');

const logoutRouter = expres.Router();
logoutRouter.get('/', (req, res, next) => {
  try {
    res.clearCookie('auth');
    res.clearCookie('userName');
    res.json('You has been logout');
  } catch (er) {
    next(er);
  }
});

module.exports = {
  logoutRouter,
};
