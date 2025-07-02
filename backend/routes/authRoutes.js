import express from 'express';
import { registerUser, loginUser, getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/authController.js';

const router = express.Router();

// Public routes (no authentication required)
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes will be handled by authMiddleware in server.js
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;