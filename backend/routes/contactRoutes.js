import express from 'express';
import { getAllMessages, getMessageById, createMessage } from '../controllers/contactController.js';

const router = express.Router();

// Route to submit a new contact message (public)
router.post('/contact', (req, res) => {
  console.log('POST /api/contact route hit'); // Add this log
  createMessage(req, res);
});

// Routes to get messages (can be protected if needed)
router.get('/contact', getAllMessages);
router.get('/contact/:id', getMessageById);

export default router;