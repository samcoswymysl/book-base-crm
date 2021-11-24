const express = require('express');

const adminRouter = express.Router();

adminRouter.get('/', (req, res, next) => {
  res.json('jest ok');
});

module.exports = {
  adminRouter,
};
