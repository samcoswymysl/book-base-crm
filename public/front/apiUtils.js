const sortAlgorytm = (docs) => {
  const front = [];
  const back = [];

  docs.map((doc) => {
    if (!doc.cover_i) {
      back.push(doc);
    } else {
      front.push(doc);
    }
  });
  const sortedElement = [...front, back];
  return sortedElement;
};

const findCover = (docCoverId) => {
  if (!docCoverId) {
    return 'Patch To Defoolt IMG'; // TODO Add patch to defolt IMG
  }
  return `https://covers.openlibrary.org/b/id/${docCoverId}-L.jpg`;
};

// find book by title

const findBooksByTitle = async (title) => {
  try {
    if (!title) {
      throw new Error('Title cannot be empty');
    }
    if (typeof title !== 'string') {
      throw new Error('Title must be string ');
    }

    const data = await fetch(`http://openlibrary.org/search.json?q=${title}`);
    const dataEncode = await data.json();

    return sortAlgorytm(dataEncode);
  } catch (er) {
    console.log(er.message);
  }
};

const checkDescription = (bookInfo) => {
  if (typeof bookInfo.description === 'object') {
    return bookInfo.description.value;
  } if (!bookInfo.description) {
    return 'No description';gi
  }
  return bookInfo.description;
};

const getOneBook = async (workID) => {
  const oneBook = await fetch(`https://openlibrary.org${workID}`);
  const encodeBookInfo = await oneBook.json();

  return {
    imageSrc: encodeBookInfo.covers ? findCover(encodeBookInfo.covers[0]) : 'patch to defult img',
    description: checkDescription(encodeBookInfo),
    encodeBookInfo,
  };
};
