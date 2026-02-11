const express = require('express');
const { Server } = require('socket.io');
const { createServer } = require('node:http');
const cors = require('cors');

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());

io.on('connection', (socket) => {

  socket.on('message', (msg) => {
    io.emit('message', msg);
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket.id);
  });
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Expresssss' });
});
