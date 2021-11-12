const express = require('express');

const homeRouter = express.Router();

homeRouter.get('/', (req, res, c) => {
  res.render('home/home');
});

module.exports = {
  homeRouter,

};
