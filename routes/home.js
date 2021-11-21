import express from 'express';


export const homeRouter = express.Router();

const renderHomePage = (req, res) => res.render('home/home');

const sendBookData = (req, res) => res.json('xxx');

homeRouter
  .get('/', renderHomePage)
  .post('/', sendBookData);
