import express from 'express';
import { generateTrip, getTrip, getAllTrips, deleteTrip } from '../controllers/tripController.js';
import { cacheMiddleware } from '../middleware/cache.js';

const router = express.Router();

router.post('/generate', generateTrip);
router.get('/', getAllTrips);
router.get(
  '/:id',
  cacheMiddleware((req) => `trip:${req.params.id}`),
  getTrip
);
router.delete('/:id', deleteTrip);

export default router;
