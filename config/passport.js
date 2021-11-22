const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const { compare } = require('bcrypt');
const User = require('../models/User');

passport.use(
  new LocalStrategy({ usernameField: 'name', session: false }, async (name, password, done) => {
    try {
      const userFind = await User.findOne({ name });
      if (userFind === null) {
        return done(null, false, { message: `User ${name} doesn't exist` });
      }
      await compare(password, userFind.password, (err, isMatch) => {
        if (err) {
          throw err;
        }

        if (isMatch) {
          return done(null, userFind);
        }
        return done(null, false, { message: 'Incorrect password' });
      });
    } catch (e) {
      return done(null, false, e.message);
    }
  }),
);

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const config = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

function verifyCallback(payload, done) {
  return User.findOne({ _id: payload.id })
    .then((user) => done(null, user)).catch((err) => done(err));
}
passport.use(new JWTStrategy(config, verifyCallback));

module.exports = {
  passport,

};
