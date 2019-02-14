module.exports = (server) => {
  var io = require('socket.io').listen(server);
  io.on('connection', (socket) => {
    socket.on('auth', (data) => {

    })
    socket.on('login', (data) => {
      socket.userID = data.id;
      io.sockets.emit('onCon', data);
    })
    socket.on('disconnect', () => {
      io.sockets.emit('offCon', socket.userID);
    })
    // io.sockets.emit('onCon', 'new connection');
  })
  return io.sockets;
}
