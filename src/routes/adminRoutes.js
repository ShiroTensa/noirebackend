import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import { listUsers, deleteUser } from '../controllers/adminController.js';

const router = express.Router();
router.get('/users', protect, admin, listUsers);
router.delete('/users/:id', protect, admin, deleteUser);

export default router;
