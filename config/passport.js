const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const { compare } = require('bcrypt');
const User = require('../models/User');
const { WrongName, WrongPass } = require('./errors');

passport.use('local',
  new LocalStrategy({ usernameField: 'name', session: false }, async (name, password, done) => {
    try {
      const userFind = await User.findOne({ name });
      if (userFind === null) {
        throw new WrongName();
      }
      const match = await compare(password, userFind.password);

      if (!match) {
        throw new WrongPass();
      } else {
        return done(null, userFind);
      }
    } catch (er) {
      done(er);
    }
  }));

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const config = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

async function verifyCallback(payload, done) {
  try {
    const user = await User.findOne(({ _id: payload.id }));
    done(null, user);
  } catch (er) {
    done(er);
  }
}
// No testing it work wersion TODO test and delete
// return User.findOne({ _id: payload.id })
//   .then((user) => done(null, user)).catch((err) => done(err));

passport.use(new JWTStrategy(config, verifyCallback));

module.exports = {
  passport,

};
