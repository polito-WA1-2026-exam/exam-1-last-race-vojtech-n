import passport from 'passport';
import LocalStrategy from 'passport-local';
import { hashPassword, verifyPassword } from '../utils/crypto.js';
import { validateUser, getUser } from '../models/user.model.js';

passport.use(new LocalStrategy({ usernameField: 'username', passwordField: 'password' }, async(username, password, done) => {
  try {
    const user = await validateUser(username);

    if (!user) {
      return done(null, false, { message: 'Incorrect user info!' });
    }

    if (!verifyPassword(password, user.salt, user.password)) {
      return done(null, false, { message: 'Incorrect user info!'});
    }

    // Remove sensitive data from user
    const { password: _, salt: __, ...safeUser } = user;
    return done(null, safeUser);

  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser(async(username, done) => {
  try {
    const user = await getUser(username);
    done(null, user);
  } catch (err) {
    next(err);
  }
});

export default passport;