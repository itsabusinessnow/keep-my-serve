import express from 'express';
import passport from 'passport';
import {
  getActors,
  getActor,
  currentlyNotSupported,
  defaultIsPublic,
} from '../controllers/actorController';
import { catchErrors } from '../handlers/errorHandlers';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ test: 'hellozzzzz' });
});

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// router.get('/auth/google/callback',
// passport.authenticate('google', { failureRedirect: '/' }),
// function(req, res) {
//   res.redirect('/api/v1/auth/login/success');
// });
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { session: false }),
  function (req, res) {
    res.redirect('http://localhost:3000/staging?token=SK123');
  }
);

router.get('/auth/login/success', (req, res) => {
  console.log(req.headers.authorization);
  if (req.headers.authorization === 'SK123')
    return res.json({ success: true, user: { name: 'Reino' } });

  return res.status(403).json({ success: false });
});

router.get('/actors', currentlyNotSupported);
router.get('/actors/:organisation', defaultIsPublic, catchErrors(getActors));
router.get('/actors/:organisation/:account', catchErrors(getActors));
router.get('/actor/:actor', currentlyNotSupported);
router.get(
  '/actor/:actor/:organisation',
  defaultIsPublic,
  catchErrors(getActor)
);
router.get('/actor/:actor/:organisation/:account', catchErrors(getActor));

export default router;
