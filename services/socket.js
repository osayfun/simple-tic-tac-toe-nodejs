var Users         = require('../models/user');
var LoginLog      = require('../models/loginLog');
var Games         = require('../models/game');
var cookieParser  = require('cookie-parser');
var winAlgorithm  = require('./game');

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

    socket.on('move', (data, cb) => {
      if( socket.move ){

        Games.findOne({'_id': data.game}, (err, game) => {
          if( err ){

            cb({success: false});
          }else{
            if( game ){

              var position  = "opp" + data.position;
              var me        = game[position];
              if( socket.userid = me.toString() ){

                
              }else{
                cb({success: false});
              }
            }else{
              cb({success: false});
            }
          }
        })
      }else{
        cb({success: false});
      }
    })
    // Start Game
    socket.on('startGame', (data) => {
      var newGame = new Games({
        opp1: socket.userid,
        opp2: io.sockets.sockets[data.opponent].userid,
      });
      newGame.save((err) => {
        if( err ){

          // emit error
        }else{
          io.sockets.sockets[data.opponent].gameid    = newGame._id.toString();
          io.sockets.sockets[data.opponent].available = 0;
          io.sockets.sockets[data.opponent].mark      = 1;
          io.sockets.sockets[data.opponent].move      = false;
          io.sockets.sockets[data.opponent].pattern   = [ 0, 0, 0,
                                                          0, 0, 0,
                                                          0, 0, 0];
          socket.gameid     = newGame._id.toString();
          socket.mark       = 0;
          socket.available  = 0;
          socket.move       = true;
          socket.pattern    = [ 0, 0, 0,
                                0, 0, 0,
                                0, 0, 0];
          socket.emit('gameStat', {game: newGame._id.toString(), position: 1});
          io.sockets.sockets[data.opponent].emit('gameStat', {game: newGame._id.toString(), position: 2});
        }
      })
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
      socket.emit('offClean', {do: true});
    })
  })
  return io.sockets;
}
