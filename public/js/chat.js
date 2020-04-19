const socket = io.connect('http://localhost:3000');

const message = document.getElementById('message-input');
const sendMsg = document.getElementById('send-message');
const displayMsg = document.getElementById('display-message');
const typingLabel = document.getElementById('typing-label');
const chatWindow = document.getElementById('chat-window');
const usersCounter = document.getElementById('users-counter');
const msgErr = document.getElementById('message-error');
const join = document.getElementById('you-joined');


const username = prompt('Enter your Name');

if (username === null || username.trim().length === 0) {
  join.innerHTML = '<p>Please refresh the page and enter your Name properly!<p>';
  throw new Error('Refresh the page and enter your Name');
}
else { 
  join.innerHTML = '<p>You have joined the chat!<p>';
  socket.emit('new-user', username);
}

socket.on('user-connected', (username) => {
  displayMsg.innerHTML += `<p><strong>${username}</strong> has connected!</p>`;
});

socket.on('broadcast', (number) => { 
  usersCounter.innerHTML = number;
});

socket.on('new-message', (data) => {
  typingLabel.innerHTML = '';
  displayMsg.innerHTML += `<p><strong>${data.username}</strong> <em>at ${new Date().getHours()}:${new Date().getMinutes()}</em> : ${data.message}</p>`;
  chatWindow.scrollTop = chatWindow.scrollHeight;
});

socket.on('is-typing', (username) => {
  typingLabel.innerHTML = `<p>${username} is typing</p>`;
  chatWindow.scrollTop = chatWindow.scrollHeight;
});

socket.on('user-disconnected', (username) => {
  if (username == null) { 
    displayMsg.innerHTML += `<p>Unloggined user has disconnected!</p>`;
  }
  else {
    displayMsg.innerHTML += `<p><strong>${username}</strong> has disconnected!</p>`;
  }
});

sendMsg.addEventListener('click', () => { 
  if (message.value === null || message.value.trim().length === 0) {
    msgErr.innerHTML = '🚨Message is required!';
    return;
  }
  
  socket.emit('new-message', {
    message: message.value,
    username: username
  });
  message.value = '';
  msgErr.innerHTML = '';
});

message.addEventListener('keypress', () => {
  socket.emit('is-typing', username);
});
