import Unauthorized from './errors';

export default class ConnectWithServ {
  static addUser(name, password) {
    return new Promise((resolve, reject) => {
      try {
        fetch('http://localhost:3000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            password,
          }),

        })
          .then((res) => res.json())
          .then((data) => {
            resolve(data);
          });
      } catch (e) {
        reject(e.message);
      }
    });
  }

  static login(name, password) {
    return new Promise((resolve) => {
      fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          password,
        }),
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch(() => {
          resolve('Error try later');
        });
    });
  }

  static getFavorite(token) {
    return new Promise((resolve) => {
      fetch('http://localhost:3000/fav', {
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
            resolve('Sorry Ty Later');
          }
        });
    });
  }

  static addToFav(token, bookInfo) {
    return new Promise((resolve) => {
      fetch('http://localhost:3000/fav', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ book: bookInfo }),
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
            resolve('Sorry Ty Later');
          }
        });
    });
  }

  static deleteOnFav(token, bookInfo) {
    return new Promise((resolve) => {
      fetch('http://localhost:3000/fav', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ book: bookInfo }),
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
            resolve('Sorry Ty Later');
          }
        });
    });
  }

  static logout() {
    return new Promise((resolve) => {
      fetch('http://localhost:3000/logout', {
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((res) => resolve(res))
        .catch(() => {
          resolve('Error try later');
        });
    });
  }
}
