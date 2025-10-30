import express from 'express';
import { createOrder, getUserOrders, cancelOrder, listAllOrders, updateOrderStatus } from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/', protect, createOrder);
router.get('/my-orders', protect, getUserOrders);
router.put('/:id/cancel', protect, cancelOrder);

// admin
router.get('/all', protect, admin, listAllOrders);
router.put('/:id/status', protect, admin, updateOrderStatus);

export default router;
