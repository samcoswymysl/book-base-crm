// todo correct handleeeror
export default class ConnectApi {
  static sortAlgorytm(docs) {
    const sorted = [];
    docs.map((doc) => ((doc.cover_i) ? sorted.unshift(doc) : sorted.push(doc)));
    return sorted;
  }

  static getBooks(title) {
    return new Promise((resolve) => {
      fetch(`http://openlibrary.org/search.json?q=${title}`)
        .then((res) => res.json())
        .then((res) => {
          const sorted = this.sortAlgorytm(res.docs);
          return resolve(sorted);
        })
        .catch(() => {
          resolve('Error try later');
        });
    });
  }

  static getOneBook(key) {
    return new Promise((resolve) => {
      fetch(`https://openlibrary.org/books/${key}.json`)
        .then((res) => res.json())
        .then((res) => resolve(res))
        .catch(() => {
          resolve('Error try later');
        });
    });
  }
}
