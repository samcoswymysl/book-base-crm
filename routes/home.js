import express from 'express';

export const homeRouter = express.Router();

homeRouter.get('/', (req, res, c) => {
  res.render('home/home');
});


