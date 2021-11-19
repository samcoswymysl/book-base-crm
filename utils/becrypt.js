const { hash, compare } = require('bcrypt');

const encodePass = (password) => {
  hash(password, 10, (error, hash) => {
    try {
      if (error) {
        throw new Error('Problem with hash password');
      } else {
        return hash;
      }
    } catch (e) {
      return e.message;
    }
  });
};

// check pass and return boolyen
const checkPass = (pas, hashPss) => {
  compare(pas, hashPss, (error, res) => res);
};

module.exports = {
  encodePass,
  checkPass,
};
