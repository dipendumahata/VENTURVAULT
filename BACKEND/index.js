import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import connectDB from './config/db.js';
import errorHandler from './middleware/error.js';
import socketHandler from './socket/socketHandler.js';

// Import all route files
import authRoutes from './routes/authRoutes.js';
import businessRoutes from './routes/businessRoutes.js';
import investorRoutes from './routes/investorRoutes.js';
import bankingRoutes from './routes/bankingRoutes.js';
import advisoryRoutes from './routes/advisoryRoutes.js';
import dealRoomRoutes from './routes/dealRoomRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import userRoutes from './routes/userRoutes.js';
import insightsRoutes from './routes/insightsRoutes.js';
import adminRoutes from './routes/adminRoutes.js';


// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // In production, restrict this to your frontend's URL
    methods: ["GET", "POST"]
  }
});

// Make io accessible to our controllers
app.set('io', io);

// Setup socket connection handling
socketHandler(io);

const PORT = process.env.PORT || 5001;

// Core Middleware
app.use(cors());
app.use(express.json());

// Mount all routers
app.use('/api/auth', authRoutes);
app.use('/api/business', businessRoutes);
app.use('/api/investors', investorRoutes);
app.use('/api/banking', bankingRoutes);
app.use('/api/advisory', advisoryRoutes);
app.use('/api/deal-rooms', dealRoomRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/insights', insightsRoutes);
app.use('/api/admin', adminRoutes);


// Custom Error Handler Middleware (must be last)
app.use(errorHandler);

// Start the server
server.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
});