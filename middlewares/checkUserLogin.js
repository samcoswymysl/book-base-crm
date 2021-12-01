const passport = require('passport');

module.exports = function (req, res, next) {
  passport.authenticate('local', { session: false })(req, res, next);
};
