const path = require('path');

module.exports = {
  outputDir: path.resolve(__dirname, '../server/public'),
  devServer: {
    proxy: {
      '/admin': {
        target: 'http://localhost:3000',
      },
      '/users': {
        target: 'http://localhost:3000',
      },
      '/books': {
        target: 'http://localhost:3000',
      },
      '/register': {
        target: 'http://localhost:3000',
      },
      '/login': {
        target: 'http://localhost:3000',
      },
      '/fav': {
        target: 'http://localhost:3000',
      },
      '/logout': {
        target: 'http://localhost:3000',
      },
    },
  },
};
