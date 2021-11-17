import { findBooksByTitle, findCover } from './apiUtils.js';

const button = document.querySelector('.findTitle');
const input = document.querySelector('#title');

const sendData = async (data) => {
  await fetch('http://localhost:3000/home', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),

  });
};

const findImportantInfo = (docs) => {
  const importantData = docs.map((doc) => ({
    cover: findCover(doc),
    authors: doc.author_name,
    title: doc.title,
  }));
  sendData(importantData);
};

button.addEventListener('click', async () => {
  const dataFromApi = await findBooksByTitle(input.value);
  await findImportantInfo(dataFromApi);
});
