//var app = require('../express');
module.exports = function(app) {

    var models = require("./models/models.js")();

    require('./services/user.service.server.js')(app, models);
    require('./services/website.service.server.js')(app, models);
    require('./services/widget.service.server.js')(app, models);
    require('./services/page.service.server.js')(app, models);

    console.log("found models");

    app.get('/goodbye', sayHello);
    app.get('/websites', sendWebsites);

    function sendWebsites(req, res) {
        var websites = [
            {name: 'facebook'},
            {name: 'twitter'},
            {name: 'linkedin'}
        ];
        res.send(websites);
    }

    function sayHello() {
        console.log('hello');
    }
};
