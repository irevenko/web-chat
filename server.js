const express = require('express');
const http = require('http');
const path = require('path');
const socket = require('socket.io');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
const pid = process.pid;

app.use(express.static(path.join(__dirname, 'public')));
server.listen(PORT, () => console.log(`Listening on port: ${PORT} \nPID: ${pid}`));

const io = socket(server);
io.on('connection', (socket) => {
    console.log(`The socket is connected!\nSocket id: ${socket.id}`);

    socket.on('chat', (data) => {
        io.emit('chat', data);
    });

    socket.on('is_typing', (data) => {
        socket.broadcast.emit('is_typing', data);
    });
});