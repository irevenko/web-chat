const socket = io.connect('http://localhost:3000');

const message = document.getElementById('message-input');
const username = document.getElementById('username-input');
const sendMsg = document.getElementById('send-message');
const displayMsg = document.getElementById('display-message');
const typingLabel = document.getElementById('typing-label');
const chatWindow = document.getElementById('chat-window');
const usersCounter = document.getElementById('users-counter')

sendMsg.addEventListener('click', () => {
  socket.emit('new-message', {
    message: message.value,
    username: username.value
  });
  message.value = '';
});

message.addEventListener('keypress', () => {
  socket.emit('is-typing', username.value);
});

socket.on('new-message', (data) => {
  typingLabel.innerHTML = '';
  displayMsg.innerHTML += `<p><strong>${data.username}</strong> <em>at ${new Date().getHours()}:${new Date().getMinutes()}</em> : ${data.message}</p>`;
  chatWindow.scrollTop = chatWindow.scrollHeight;
});

socket.on('is-typing', (data) => {
  typingLabel.innerHTML = `<p><u>${data} is typing</u></p>`;
  chatWindow.scrollTop = chatWindow.scrollHeight;
});

socket.on('broadcast', (data) => { 
  usersCounter.innerHTML = data;
});