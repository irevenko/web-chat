const socket = io.connect('http://localhost:3000');

const message = document.getElementById('message-input');
const sendMsg = document.getElementById('send-message');
const displayMsg = document.getElementById('display-message');
const typingLabel = document.getElementById('typing-label');
const chatWindow = document.getElementById('chat-window');
const usersCounter = document.getElementById('users-counter');
const msgErr = document.getElementById('message-error');
const join = document.getElementById('you-joined');


const username = prompt('Enter your Username');
join.innerHTML = '<p>You have joined the chat!<p>';
socket.emit('new-user', username);

socket.on('user-connected', (username) => {
  appendMessage(`<p><strong>${username}</strong> has connected!</p>`);
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
  appendMessage(`<p><strong>${username}</strong> has disconnected!</p>`);
});

sendMsg.addEventListener('click', () => { 
  if (message.value === '' || message.value == null) {
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

function appendMessage(msgText) {
  const msgElement = document.createElement('span');
  msgElement.innerHTML = msgText;
  displayMsg.append(msgElement);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}
