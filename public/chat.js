const socket = io.connect('http://localhost:3000');

const message = document.getElementById('message-text');
const user = document.getElementById('user-name');
const sendMsg = document.getElementById('send-message');
const displayMsg = document.getElementById('display-message');
const typingLabel = document.getElementById('typing-label');
const chatWindow = document.getElementById('chat-window');


sendMsg.addEventListener('click', () => {
    socket.emit('new-message', {
        message: message.value,
        user: user.value
    });
    message.value = '';
});

message.addEventListener('keypress', () => {
    socket.emit('is-typing', user.value);
});

socket.on('new-message', (data) => {
    typingLabel.innerHTML = '';
    displayMsg.innerHTML += `<p><strong>${data.user}</strong> <em>at ${new Date().getHours()}:${new Date().getMinutes()}</em> : ${data.message}</p>`;
    chatWindow.scrollTop = chatWindow.scrollHeight;
});

socket.on('is-typing', (data) => {
    typingLabel.innerHTML = `<p><u>${data} is typing</u></p>`;
    chatWindow.scrollTop = chatWindow.scrollHeight;
});