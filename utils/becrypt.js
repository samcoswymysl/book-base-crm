const { hash, compare } = require('bcrypt');

const encodePass =  async (password) => {
   hash(password, 10, await (error, hash) => {
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

// checkj pass and return boolyen
const checkPass = (pas, hashPss) => {
  compare(pas, hashPss, (error, res) => res);
};

encodePass('chuj')

// checkPass('chduj', '$2b$10$6kLKSnrG4bTaqF3oqqRlLe.2rteNUUWa2bIqXGv03bseiFwsjHbT.');

module.exports = {
  encodePass,
  checkPass,
};
