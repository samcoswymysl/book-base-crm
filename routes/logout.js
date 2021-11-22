const expres = require('express');

const logoutRouter = expres.Router();

logoutRouter.get('/', (req, res) => {
  res.clearCookie('auth');
  res.json('You has been logout');
});

module.exports = {
  logoutRouter,
};
