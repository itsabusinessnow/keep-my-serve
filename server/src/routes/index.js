import express from 'express';
import passport from 'passport';
import {
  getActors,
  getActor,
  currentlyNotSupported,
  createActor,
  updateActor,
  deleteActor,
} from '../controllers/actorController';
import {
  createSimpleText,
  deleteSimpleText,
  getSimpleText,
  getSimpleTexts,
  updateSimpleText,
} from '../controllers/simpleTextController';
import { catchErrors } from '../handlers/errorHandlers';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ test: 'hellozzzzz' });
});

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile'] })
);

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

router.get('/auth/logout', (_, res) => res.redirect('http://localhost:3000/'));

router.get('/actor', catchErrors(getActors));
router.post('/actor', catchErrors(createActor));
router.get('/actor/:actorId', catchErrors(getActor));
router.put('/actor/:actorId', catchErrors(updateActor));
router.delete('/actor/:actorId', catchErrors(deleteActor));
router.post('/actor/:actorId/uploadAvatar', currentlyNotSupported);

router.get('/simpleText', catchErrors(getSimpleTexts));
router.post('/simpleText', catchErrors(createSimpleText));
router.get('/simpleText/:simpleTextId', catchErrors(getSimpleText));
router.put('/simpleText/:simpleTextId', catchErrors(updateSimpleText));
router.delete('/simpleText/:simpleTextId', catchErrors(deleteSimpleText));

export default router;
