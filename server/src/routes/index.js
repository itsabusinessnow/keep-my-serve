import express from 'express';
import { getActors, getActor, currentlyNotSupported, defaultIsPublic } from '../controllers/actorController';
import { catchErrors } from '../handlers/errorHandlers';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ test: 'hellozzzzz' });
})

router.get('/actors', currentlyNotSupported);
router.get('/actors/:organisation', defaultIsPublic, catchErrors(getActors));
router.get('/actors/:organisation/:account', catchErrors(getActors));
router.get('/actor/:actor', currentlyNotSupported);
router.get('/actor/:actor/:organisation', defaultIsPublic, catchErrors(getActor));
router.get('/actor/:actor/:organisation/:account', catchErrors(getActor));

export default router;