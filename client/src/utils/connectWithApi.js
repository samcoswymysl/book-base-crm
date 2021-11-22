export default class ConnectApi {
  static sortAlgorytm(docs) {
    const front = [];
    const back = [];

    // eslint-disable-next-line array-callback-return
    docs.map((doc) => {
      if (!doc.cover_i) {
        back.push(doc);
        return;
      }
      front.push(doc);
    });
    return [...front, ...back];
  }

  static getBooks(title) {
    return new Promise((resolve, reject) => {
      try {
        fetch(`http://openlibrary.org/search.json?q=${title}`)
          .then((res) => res.json())
          .then((res) => {
            const sorted = this.sortAlgorytm(res.docs);
            console.log(sorted);
            return resolve(sorted);
          });
      } catch (e) {
        reject(e);
        console.log(e.message);
      }
    });
  }

  static getOneBook(key) {
    return new Promise((resolve, reject) => {
      try {
        fetch(`https://openlibrary.org/books/${key}.json`)
          .then((res) => res.json())
          .then((res) => resolve(res));
      } catch (e) {
        reject(e);
        console.log(e.message);
      }
    });
  }
}
