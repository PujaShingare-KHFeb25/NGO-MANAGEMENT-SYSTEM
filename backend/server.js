import express from 'express';
import cors from 'cors';
import donationRoutes from './routes/donationRoutes.js';
import authRoutes from './routes/authRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import authMiddleware from './middleware/authMiddleware.js';

const app = express();
const PORT = 2222;

// Configure CORS to allow requests from the frontend origin
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// Public auth routes (register and login)
app.use('/auth', authRoutes);

// Public contact route (for Contact Us form)
app.use('/api', contactRoutes);

// Protected user CRUD routes
app.use('/users', authMiddleware, authRoutes);

// Protected donation routes
app.use('/donations', authMiddleware, donationRoutes);

app.get('/', (request, response) => {
  response.send("NGO Management System Backend..!!");
});

app.listen(PORT, () => {
  console.log("Server Running...!!!");
});