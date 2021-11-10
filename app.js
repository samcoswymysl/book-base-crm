const express = require('express');
const hbs = require('express-handlebars');

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.engine('.hbs', hbs({
  extname: '.hbs',
  // helpers: handlebarsHelpers,
}));
app.set('view engine', '.hbs');






app.listen(3000, 'localhost', () => {
  console.log('Serwer listen on http://localhost:3000');
});
