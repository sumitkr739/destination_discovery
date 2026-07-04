import express from 'express';
import { generateTrip, getTrip, getAllTrips, deleteTrip } from '../controllers/tripController.js';

const router = express.Router();

router.post('/generate', generateTrip);
router.get('/', getAllTrips);
router.get('/:id', getTrip);
router.delete('/:id', deleteTrip);

export default router;
