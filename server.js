const path = require('path');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const socket = require('socket.io');
const io = socket(server);

const PID = process.pid;
const PORT = process.env.PORT || 3000;
const users = {};
let usersNum = 0; 


app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  console.log(`The socket is connected! Socket id: ${socket.id}`);
  usersNum++;

  socket.on('new-user', (username) => {
    io.emit('broadcast', `Online: ${usersNum}`);
    users[socket.id] = username;
    socket.broadcast.emit('user-connected', username);
  });

  socket.on('new-message', (data) => {
    io.emit('new-message', data);
  });

  socket.on('is-typing', (username) => {
    socket.broadcast.emit('is-typing', username);
  });

  socket.on('disconnect', () => {
    usersNum--;
    io.emit('broadcast', `Online: ${usersNum}`);
    socket.broadcast.emit('user-disconnected', users[socket.id]);
    delete users[socket.id];
  });

});

server.listen(PORT, () => { 
  console.log(`The server is Listening on http://localhost:${PORT} \nPID: ${PID}\n`);
});
