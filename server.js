const express = require('express');
const http = require('http');
const path = require('path');
const socket = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socket(server);
const pid = process.pid;
const PORT = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, 'public')));
server.listen(PORT, () => console.log(`Listening on port: ${PORT} \nPID: ${pid}`));

io.on('connection', (socket) => {
    console.log(`The socket is connected!\nSocket id: ${socket.id}`);

    socket.on('new-message', (data) => {
        io.emit('new-message', data);
    });

    socket.on('is-typing', (data) => {
        socket.broadcast.emit('is-typing', data);
    });

});

//TODO Online: 0 Users
//TODO Send emojies maybe media