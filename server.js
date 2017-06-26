var cors = require('cors');
//var app = require('./express');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({ secret: 'bakessecret' }));

app.use(passport.initialize());
app.use(passport.session());

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

require('./utilities/filelist');
//require("./test/app.js")(app);
//require("./assignment/app.js")(app);
require("./project/app.js")(app);
//require("./public/assignment/app");

var port = process.env.PORT || 3000;
//var ipAddress = '127.0.0.1';
app.listen(port);