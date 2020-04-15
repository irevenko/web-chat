const socket = io.connect('http://localhost:3000');

const username = document.getElementById('username-input');
const message = document.getElementById('message-input');
const sendMsg = document.getElementById('send-message');
const displayMsg = document.getElementById('display-message');
const typingLabel = document.getElementById('typing-label');
const chatWindow = document.getElementById('chat-window');
const usersCounter = document.getElementById('users-counter');
const userErr = document.getElementById('username-error');
const msgErr = document.getElementById('message-error');


sendMsg.addEventListener('click', () => { 
  if (username.value === '' || username.value == null) {
    userErr.innerHTML = '🚨Username is required!';
    return;
  }
  if (message.value === '' || message.value == null) {
    msgErr.innerHTML = '🚨Message is required!';
    return;
  }

  socket.emit('new-message', {
    message: message.value,
    username: username.value
  });
  message.value = '';
  userErr.innerHTML = '';
  msgErr.innerHTML = '';
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
  typingLabel.innerHTML = `<p>${data} is typing</p>`;
  chatWindow.scrollTop = chatWindow.scrollHeight;
});

socket.on('broadcast', (data) => { 
  usersCounter.innerHTML = data;
});