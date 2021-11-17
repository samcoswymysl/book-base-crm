import { findBooksByTitle } from './apiUtils.js';

const button = document.querySelector('.findTitle');
const input = document.querySelector('#title');




button.addEventListener('click', async () => {
  const dataFromApi = await findBooksByTitle(input.value);
});


