export default class ConnectWithServ {
  // Registr

  static addUser(name, password) {
    console.log(name, password);
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
            console.log(data);
            resolve(data);
          });
      } catch (e) {
        reject(e.message);
      }
    });
  }
}
