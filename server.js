const path = require('path');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const socket = require('socket.io');
const io = socket(server);

const PID = process.pid;
const PORT = process.env.PORT || 3000;
let usersNum = 0; 

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  console.log(`The socket is connected! Socket id: ${socket.id}`);
  usersNum++;
  io.emit('broadcast', `Online: ${usersNum}`);

  socket.on('new-message', (data) => {
    io.emit('new-message', data);
  });

  socket.on('is-typing', (data) => {
    socket.broadcast.emit('is-typing', data);
  });

  socket.on('disconnect', () => {
    usersNum--;
    io.emit('broadcast', `Online: ${usersNum}`);
  });

});

server.listen(PORT, () => { 
  console.log(`The server is Listening on http://localhost:${PORT} \nPID: ${PID}\n`);
});
