// Login Error
class WrongName extends Error {}
class WrongPass extends Error {}

// Register Error
class UserExist extends Error {}
class ShortLogin extends Error {}
class ShortPass extends Error {}

// authorizate
class WrongMongoId extends Error {}

// Book DB
class WrongISBN extends Error {}
class EmptyDoc extends Error {}
class EmptyValue extends Error {}
class NoFindBook extends Error {}

// panel admien
class AdminAuth extends Error {}

module.exports = {
  WrongName,
  WrongPass,
  UserExist,
  ShortLogin,
  ShortPass,
  WrongMongoId,
  WrongISBN,
  EmptyDoc,
  NoFindBook,
  EmptyValue,
  AdminAuth,
};
