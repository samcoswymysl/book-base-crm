const passport = require('passport');

module.exports = function (req, res, next) {
  passport.authenticate('admin', { session: false })(req, res, next);
};
