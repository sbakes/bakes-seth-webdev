var cors = require('cors');
//var app = require('./express');
var express = require('express');
var app = express();
app.use(cors());

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

require("./test/app.js")(app);
require("./assignment/app.js")(app);
//require("./public/assignment/app");

var port = process.env.PORT || 3000;
//var ipAddress = '127.0.0.1';
app.listen(port);