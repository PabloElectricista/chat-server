import app from './app';
import SocketIO from 'socket.io';

const port = process.env.PORT || 4000

const server = app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});

const io = SocketIO(server, {
  cors: {
    origin: '*'
  }
})

io.on('connection', (socket) => {
  console.log(`connection ID: ${socket.id}`);
  
  socket.on('message', (data) => {
    io.sockets.emit('message', data)
  })

  socket.on('typing', (data) =>{
    socket.broadcast.emit('typing', data);
  })
})

