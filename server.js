const express = require('express');
const socket = require('socket.io');

const app = express();
const server = app.listen(4000, () => { 
    console.log('Listening on port 4000!');
});

app.use(express.static('front-end'));

const io = socket(server);

io.on('connection', function(socket){ 
    console.log('The socket is connected!\nSocket id:', socket.id)
});