import { Router } from 'express';
import {
  login,
  logout,
  register,
  checkAuthorization
} from '../controllers/auth/auth.controller';

import isValidToken from '@/middleware/token.middleware'

const router = Router();

// POST

router.post('/auth/login', login);
router.post('/auth/register', register);
router.post('/auth/logout', isValidToken ,logout);
router.post('/auth/checkAuthorization', checkAuthorization);

export default router;