// eslint-disable-next-line no-undef
const socket = io.connect('http://localhost:3000');

const message = document.getElementById('message-input');
const sendMsg = document.getElementById('send-message');
const msgSound = document.getElementById('notification-sound');
const user = document.getElementById('username-input');
const sendUser = document.getElementById('send-username');
const displayMsg = document.getElementById('display-message');
const typingLabel = document.getElementById('typing-label');
const chatWindow = document.getElementById('chat-window');
const usersCounter = document.getElementById('users-counter');
const msgErr = document.getElementById('message-error');
const userErr = document.getElementById('username-error');
const join = document.getElementById('you-joined');
const chat = document.getElementById('chat');
const login = document.getElementById('login-page');


sendUser.addEventListener('click', () => {
  if (user.value === null || user.value.trim().length === 0) {
    userErr.innerHTML = '🚨 Name is required!';
    return;
  }

  userErr.innerHTML = '';
  login.style.display = 'none';
  chat.style.display = 'block';
  join.innerHTML = '<p>You have joined the chat!<p>';
  socket.emit('new-user', user.value);
});

sendMsg.addEventListener('click', () => {
  if (message.value === null || message.value.trim().length === 0) {
    msgErr.innerHTML = '🚨 Message is required!';
    return;
  }

  socket.emit('new-message', {
    message: message.value,
    username: user.value,
  });
  message.value = '';
  msgErr.innerHTML = '';
});

message.addEventListener('keypress', () => {
  socket.emit('is-typing', user.value);
});


socket.on('user-connected', (username) => {
  displayMsg.innerHTML += `<p><strong>${username}</strong> has connected!</p>`;
  chatWindow.scrollTop = chatWindow.scrollHeight;
  msgSound.play();
});

socket.on('broadcast', (number) => {
  usersCounter.innerHTML = number;
});

socket.on('new-message', (data) => {
  typingLabel.innerHTML = '';
  displayMsg.innerHTML += `<p><strong>${data.username}</strong><em> at ${new Date().getHours()}:${new Date().getMinutes()}</em> : ${data.message}</p>`;
  chatWindow.scrollTop = chatWindow.scrollHeight;
  msgSound.play();
});

socket.on('is-typing', (username) => {
  typingLabel.innerHTML = `<p>${username} is typing...</p>`;
  chatWindow.scrollTop = chatWindow.scrollHeight;
});

socket.on('user-disconnected', (username) => {
  if (username == null) {
    displayMsg.innerHTML += '<p>Unlogged user has disconnected!</p>';
    chatWindow.scrollTop = chatWindow.scrollHeight;
  } else {
    displayMsg.innerHTML += `<p><strong>${username}</strong> has disconnected!</p>`;
    chatWindow.scrollTop = chatWindow.scrollHeight;
    msgSound.play();
  }
});
