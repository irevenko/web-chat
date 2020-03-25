const express = require('express');
const socket = require('socket.io');

const app = express();
const PORT = 3000;
const pid = process.pid;

const server = app.listen(PORT, () => console.log(`Listening on port: ${PORT} \nPID: ${pid}`));
app.use(express.static('front-end'));

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