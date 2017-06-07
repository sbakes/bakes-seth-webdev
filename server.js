var cors = require('cors');
var express = require('express');
var app = express();
app.use(cors());

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

require("./assignment/app.js")(app);
require("./test/app.js")(app);

var port = process.env.PORT || 3000;

app.listen(port);