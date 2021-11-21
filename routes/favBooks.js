const expres = require('express');
const logController = require('../middlewares/auth')

const favBooksRouter = expres.Router();

favBooksRouter.get('/', logController, (req, res) => {
  res.json('zalogowany');
});

module.exports = {
  favBooksRouter,
};
