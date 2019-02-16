var Users     = require('../models/user');
var LoginLog  = require('../models/loginLog');
var Games     = require('../models/game');
var cookieParser = require('cookie-parser');

module.exports = (io) => {
  io.on('connection', (socket) => {
    // Online List initial
    var allUsers = [];
    // console.log(socket.handshake.session);
    for( var i in io.sockets.sockets ){
      if( io.sockets.sockets[i].username ){

        allUsers.push({
          id:       io.sockets.sockets[i].userid,
          name:     io.sockets.sockets[i].name,
          username: io.sockets.sockets[i].username,
        })
      }
    }
    socket.emit('onlines', allUsers);
    if( socket.handshake.session.passport && socket.handshake.session.passport.user ){

      var user = socket.handshake.session.passport.user;
      socket.username = user.username;
      socket.name = user.name;
      socket.userid = user._id.toString();
      socket.available = false;
      io.sockets.emit('onCon', {'name': socket.name, 'username': socket.username, 'id': socket.userid});
    }
    // Set as Available
    socket.on('setAvailable', () => {
      socket.available = true;
      io.sockets.emit('onAvailable', {'socket': socket.id, 'name': socket.name, 'username': socket.username, 'id': socket.userid});
    })
    // Get Available List
    socket.on('getAvailable', () => {
      var totalAvailable = [];
      for( var i in io.sockets.sockets ){
        if( io.sockets.sockets[i].available ){

          totalAvailable.push({
            socket:   io.sockets.sockets[i].id,
            id:       io.sockets.sockets[i].userid,
            name:     io.sockets.sockets[i].name,
            username: io.sockets.sockets[i].username,
          })
        }
      }
      socket.emit('listAvailable', totalAvailable);
    })
    // Bots Login
    socket.on('login', (data) => {
      socket.username   = data.username;
      socket.name       = data.name;
      socket.userid     = data.id;
      socket.available  = true;
      io.sockets.emit('onAvailable', {'socket': socket.id, 'name': socket.name, 'username': socket.username, 'id': socket.userid});
      io.sockets.emit('onCon', data);
    })
    // Disconnect
    socket.on('disconnect', () => {
      io.sockets.emit('offCon', socket.userid);
      io.sockets.emit('offAvailable', socket.userid);
      console.log('dis');
      socket.emit('offClean', {do: true});
    })
  })
  return io.sockets;
}
