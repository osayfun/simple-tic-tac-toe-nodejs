var ioClient = require('socket.io-client');

var socket = ioClient.connect('http://localhost:9595');

socket.emit('login', {'name': 'Easy AI BOT', 'username': 'easy-ai-bot', 'id': '55c66b6aff776610f6c733ce0'});
