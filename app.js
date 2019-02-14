var express   = require('express');
var http      = require('http');
var morgan    = require('morgan');
var mongoose  = require('mongoose');
var session   = require('express-session');

var index = require('./routes/index');

// Server Config
var app     = express();
var server  = http.createServer(app);
var sockets = require('./services/socket')(server);

// MongoDB Config
var monogourl = 'mongodb://localhost:27017/tic';
mongoose.connect(monogourl, { useNewUrlParser: true });
mongoose.connection.on('connected', () => {
  console.log('Connected to Database');
});

app.use(morgan('dev'));
app.use(express.static(__dirname + '/static'));
app.set('views', __dirname + '/views');

app.use('/', index);

server.listen(9595, () => {
  console.log('Listening on 9595');
})
