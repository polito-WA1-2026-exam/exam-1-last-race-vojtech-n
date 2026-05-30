import express from 'express';
import passport from '../config/passport.js';
import { isLoggedIn } from '../middlewares/auth.js';

const router = express.Router();

router.post('/login',
  passport.authenticate('local', { failureMessage: true }),
  (req, res) => {
    res.json(req.user);
  }
);

router.delete('/logout', isLoggedIn, (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.status(200).json({ message: 'Logged out' });
  });
});

router.get('/current', isLoggedIn, (req, res) => {
  res.status(200).json(req.user);
});

export default router;