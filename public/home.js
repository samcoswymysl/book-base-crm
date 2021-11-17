import { findBooksByTitle } from './apiUtils.js';

const button = document.querySelector('.findTitle');
const input = document.querySelector('#title');

button.addEventListener('click', () => {
  findBooksByTitle(input.value);
});
