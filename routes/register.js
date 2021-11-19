import express from 'express';

export const registerRouter = express.Router();

registerRouter.post('/', (req, res) => {
  console.log(req.body);
  res.json({ ok: 'ok' });
});
