const socket = io.connect('http://localhost:4000');

const message = document.getElementById('message-text');
const user = document.getElementById('user-name');
const button = document.getElementById('send-button');
const output = document.getElementById('display-message');
const indicator = document.getElementById('indicator');

button.addEventListener('click', () => {
    socket.emit('chat', {
        message: message.value,
        user: user.value
    });
    message.value = '';
});

message.addEventListener('keypress', () => {
    socket.emit('is_typing', user.value);
});

socket.on('chat', (data) => {
    indicator.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.user + '</strong>: ' + data.message + '</p>';
});

socket.on('is_typing', (data) => {
    indicator.innerHTML = '<p><u>' + data + ' is typing</u></p>';
})