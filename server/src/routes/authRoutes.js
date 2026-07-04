import express from 'express';
import { body } from 'express-validator';
import { register, login, getProfile } from '../controllers/authController.js';
import { requireAuth, authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/register',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('name').optional().trim()
  ],
  register
);

router.post('/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty()
  ],
  login
);

router.get('/profile', authenticateToken, requireAuth, getProfile);

export default router;
