const express = require('express');

const app = express();

app.listen(3000, 'localhost', () => {
  console.log('Serwer listen on http://localhost:3000');
});
