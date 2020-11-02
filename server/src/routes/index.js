import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ test: 'hellozzzzz' });
})

export default router;