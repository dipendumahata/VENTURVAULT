import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const socketHandler = (io) => {
  io.use(async (socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error('Authentication error: Token not provided'));
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = await User.findById(decoded.id);
      if (!socket.user) return next(new Error('Authentication error: User not found'));
      next();
    } catch (err) {
      next(new Error('Authentication error: Invalid token'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id} for user ${socket.user.profile.firstName}`);
    socket.join(socket.user.id.toString());

    socket.on('join_deal_room', (dealRoomId) => {
        socket.join(dealRoomId);
        console.log(`User ${socket.user.id} joined deal room ${dealRoomId}`);
    });

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });
};

export default socketHandler;
