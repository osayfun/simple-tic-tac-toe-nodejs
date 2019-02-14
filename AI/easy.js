var ioClient = require('socket.io-client');

var socket = ioClient.connect('http://localhost:9595');

socket.emit('login', {'name': 'Easy AI BOT', 'id': '5252'});
