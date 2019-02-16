var express       = require('express');
var http          = require('http');
var morgan        = require('morgan');
var mongoose      = require('mongoose');
var session       = require('express-session');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var passport      = require('passport');
var MongoStore   = require('connect-mongo')(session);
var sharedsession = require("express-socket.io-session");

var ioSession = session({
  secret: 'mysupersecret',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  }),
  cookie: {
    maxAge: 180 * 60 * 10000000
  }
});

// MongoDB Config
var monogourl = 'mongodb://localhost:27017/tic';
mongoose.connect(monogourl, { useNewUrlParser: true });
mongoose.connection.on('connected', () => {
  console.log('Connected to Database');
});

// Server Config
var app     = express();
var server  = http.createServer(app);
app.use(ioSession);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));
var io = require('socket.io').listen(server);
io.use(sharedsession(ioSession));
var socket = require('./services/socket')(io);
var index = require('./routes/index')(io);

app.use(morgan('dev'));
app.use(express.static(__dirname + '/static'));
app.set('views', __dirname + '/views');

app.use('/', index);

server.listen(9595, () => {
  console.log('Listening on 9595');
})
