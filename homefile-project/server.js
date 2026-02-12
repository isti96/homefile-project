const express = require('express');
const { Server } = require('socket.io');
const { createServer } = require('node:http');
const cors = require('cors');
const path = require('path');

const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 3000;
const io = new Server(server, {
  cors: {
    origin: ['https://homefile-project.onrender.com/', 'http://localhost:4200'],
    methods: ['GET', 'POST'],
  },
});

app.use(express.static(path.join(__dirname, 'dist/homefile-project/browser')));

app.use(cors());
app.use(express.json());

io.on('connection', (socket) => {
  socket.on('message', (msg) => {
    io.emit('message', { ...msg, senderId: socket.id });
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket.id);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
