const socket = io();

const username = document.getElementById('username');
const message = document.getElementById('message');
const btn = document.getElementById('send');
const output = document.getElementById('output');
const actions = document.getElementById('actions');

const Send = () => {
  socket.emit('message', {
    "username": username.value,
    "message": message.value
  })
  message.value = '';
  socket.emit('typing', {
    username:username.value,
    done: true
  })
}

btn.addEventListener('click', Send);
message.addEventListener('keypress', function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    Send();
  } else {
    socket.emit('typing', {
      username:username.value,
      done: false
    })
  }
});

socket.on('message', (data) => {
  output.innerHTML += `<p><strong>${data.username}</strong>: ${data.message}</p>`;
})

socket.on('typing', (data) => {
  if (data.done) {
    actions.innerHTML = ''
  }
  else {
    actions.innerHTML = `<p><em>${data.username}</em> is typing a message</p>`;
  }
});