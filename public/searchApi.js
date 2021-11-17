import { findBooksByTitle, findCover } from './apiUtils.js';

const button = document.querySelector('.findTitle');
const input = document.querySelector('#title');

const sendData = async (data) => {
  await fetch('/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((data) => data.json())
    .then((data) => console.log(data));
};

const findImportantInfo = async (docs) => {
  const importantData = await docs.map((doc) => ({
    cover: findCover(doc),
    authors: doc.author_name,
    title: doc.title,
  }));
  await sendData(importantData);
};

button.addEventListener('click', async () => {
  const dataFromApi = await findBooksByTitle(input.value);
  await findImportantInfo(dataFromApi);
});
