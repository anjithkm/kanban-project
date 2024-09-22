import { Router } from 'express';
import { welcome,getTask,createTask,updatetask } from '@/controllers/task/task.controller'

const router = Router();

// GET
router.get('/', welcome );
router.get('/task', getTask);

// POST
router.post('/task', updatetask);
router.patch('/task/:id', updatetask);


export default router;