const socket = io.connect('http://localhost:4000');

const message = document.getElementById('message-text');
const user = document.getElementById('user-name');
const button = document.getElementById('send-button');
const output = document.getElementById('display');

button.addEventListener('click', () => {
    socket.emit('chat', {
        message: message.value,
        user: user.value
    });
});

socket.on('chat', (data) => {
    output.innerHTML += '<p><strong>' + data.user + '</strong>: ' + data.message + '</p>';
});
