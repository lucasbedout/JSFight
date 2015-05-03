// Dependencies
var express = require('express');
var app     = express();
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

// Routes
var auth = require('./app/controllers/auth')(passport);
app.use('/auth', auth);

app.listen(5000);
console.log('Magic happens on 5000');