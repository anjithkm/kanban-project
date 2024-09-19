// src/routes/order.ts
import { Router } from 'express';
import { createOrder, getOrders, getOrder, updateOrder,deleteOrder } from '@/controllers/order/order.controller';


const router = Router();

router.get('/orders', getOrders);
router.post('/orders',createOrder);
router.get('/orders/:id', getOrder);
router.put('/orders/:id', updateOrder);
router.delete('/orders/:id', deleteOrder);

export default router;
