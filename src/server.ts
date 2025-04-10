import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import officialRoutes from "./routes/official.route";
import searchRoutes from "./routes/search.route";

dotenv.config();
const app = express();
const httpServer = createServer(app); // Create an HTTP server
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Allow all origins (adjust this for production)
    methods: ["GET", "POST"]
  }
});

app.use(express.json());

mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('DB connected'))
  .catch(err => console.error('DB connection error:', err));

import authRoutes from "./routes/auth.route";
app.use("/api/auth", authRoutes);

import messageRoutes from "./routes/message.route";
import { Message } from "./models/message"; // Import the Message model

app.use("/api/messages", messageRoutes);

app.use("/api/officials", officialRoutes);
app.use("/search", searchRoutes);

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Listen for incoming messages
  socket.on('sendMessage', async (data) => {
    console.log('Message received:', data);

    // Save the message to the database
    const message = await Message.create({
      senderId: data.senderId,
      receiverId: data.receiverId,
      content: data.message,
      senderModel: data.senderModel,
      receiverModel: data.receiverModel
    });

    // Broadcast the message to all connected clients
    io.emit('receiveMessage', message);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

// Start the server
httpServer.listen(5001, () => console.log('Server running on port 5001'));