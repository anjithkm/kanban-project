

import { Router } from 'express';
import { apiDoc,distJson } from '@/controllers/doc/doc.controller'

const router = Router();

// GET
router.get('/api-docs', apiDoc);
router.get('/api-docs/dist.json', distJson);


export default router;