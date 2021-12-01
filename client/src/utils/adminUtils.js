import Unauthorized from './errors';

export default class AdminUtils {
  static openAdminPanel(token) {
    return new Promise((resolve, reject) => {
      fetch('admin', {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      })
        .then((res) => {
          if (res.status !== 200) {
            if (res.status === 401) {
              return reject(new Unauthorized('You are not Admin'));
            }
            return reject(new Error());
          }
          return res.json();
        })
        .then((data) => resolve(data))
        .catch((e) => reject(e));
    });
  }

  static showUserList(token) {
    return new Promise((resolve, reject) => {
      fetch('users', {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      })
        .then((res) => {
          if (res.status !== 200) {
            if (res.status === 401) {
              return reject(new Unauthorized('You are not Admin'));
            }
            return reject(new Error());
          }
          return res.json();
        })
        .then((data) => resolve(data))
        .catch((e) => reject(e));
    });
  }

  static changeAdminStatus(token, user) {
    return new Promise((resolve) => {
      fetch('users/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ user }),
      })
        .then((res) => {
          if (res.status !== 200) {
            if (res.status === 401) {
              throw new Unauthorized();
            }
            throw new Error();
          }
          return res.json();
        })
        .then((data) => resolve(data))
        .catch((e) => {
          if (e instanceof Unauthorized) {
            resolve({ status: 500, message: 'You must Login' });
          } else {
            resolve({ status: 500, message: 'Error try later' });
          }
        });
    });
  }

  static resetPasword(token, user) {
    return new Promise((resolve) => {
      fetch('users/', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ user }),
      })
        .then((res) => {
          if (res.status !== 200) {
            if (res.status === 401) {
              throw new Unauthorized();
            }
            throw new Error();
          }
          return res.json();
        })
        .then((data) => resolve(data))
        .catch((e) => {
          if (e instanceof Unauthorized) {
            resolve({ status: 500, message: 'You must Login' });
          } else {
            resolve({ status: 500, message: 'Error try later' });
          }
        });
    });
  }

  static deleteUser(token, user) {
    return new Promise((resolve) => {
      fetch('users/', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ user }),
      })
        .then((res) => {
          if (res.status !== 200) {
            if (res.status === 401) {
              throw new Unauthorized();
            }
            throw new Error();
          }
          return res.json();
        })
        .then((data) => resolve(data))
        .catch((e) => {
          if (e instanceof Unauthorized) {
            resolve({ status: 500, message: 'You must Login' });
          } else {
            resolve({ status: 500, message: 'Error try later' });
          }
        });
    });
  }

  static getOurBooksFromServ(token) {
    return new Promise((resolve) => {
      fetch('books', {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      })
        .then((res) => {
          if (res.status !== 200) {
            if (res.status === 401) {
              throw new Unauthorized();
            }
            throw new Error();
          }
          return res.json();
        })
        .then((data) => resolve(data))
        .catch((e) => {
          if (e instanceof Unauthorized) {
            resolve('You must Login');
          } else {
            resolve({ status: 500, message: 'Error try later' });
          }
        });
    });
  }

  static deleteBook(token, book) {
    return new Promise((resolve) => {
      fetch('books/', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ book }),
      })
        .then((res) => {
          if (res.status !== 200) {
            if (res.status === 401) {
              throw new Unauthorized();
            }
            throw new Error();
          }
          return res.json();
        })
        .then((data) => resolve(data))
        .catch((e) => {
          if (e instanceof Unauthorized) {
            resolve({ status: 500, message: 'You must Login' });
          } else {
            resolve({ status: 500, message: 'Error try later' });
          }
        });
    });
  }

  static addBook(token, book) {
    return new Promise((resolve) => {
      fetch('books/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ book }),
      })
        .then((res) => {
          if (res.status !== 200) {
            if (res.status === 401) {
              throw new Unauthorized();
            }
            throw new Error();
          }
          return res.json();
        })
        .then((data) => resolve(data))
        .catch((e) => {
          if (e instanceof Unauthorized) {
            resolve({ status: 409, message: 'You must Login' });
          } else {
            resolve({ status: 500, message: 'Error try later' });
          }
        });
    });
  }

  static correctBook(token, book) {
    return new Promise((resolve) => {
      fetch('books/', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ book }),
      })
        .then((res) => {
          if (res.status !== 200) {
            if (res.status === 401) {
              throw new Unauthorized();
            }
            throw new Error();
          }
          return res.json();
        })
        .then((data) => resolve(data))
        .catch((e) => {
          if (e instanceof Unauthorized) {
            resolve({ status: 409, message: 'You must Login' });
          } else {
            resolve({ status: 500, message: 'Error try later' });
          }
        });
    });
  }
}
