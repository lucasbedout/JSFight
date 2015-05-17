// Dependencies
var express = require('express');
var app     = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var path = require('path');
var mongoose = require('mongoose'); // MongoDB connection
var passport = require('passport'); // Authentication
var cookieParser = require('cookie-parser'); // Needed for authentication
var bodyParser = require('body-parser');
var session = require('express-session');
var morgan = require('morgan'); // Logs


// Local imports
var database = require('./app/config/database.js');

// Let's configure our app
mongoose.connect(database.url);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));

// Passport
require('./app/config/passport')(passport); // pass passport for configuration
app.use(session({secret: 'supinfocestnul' }));
app.use(passport.initialize());
app.use(passport.session());

// Socket.io
require('./app/routes/chat')(io);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/views/index.html'));
})

// Routes
var routes = require('./app/routes/global')(passport);
app.use('/api', routes);

server.listen(3000);
console.log('Magic happens on 3000');