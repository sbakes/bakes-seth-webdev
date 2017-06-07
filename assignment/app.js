module.exports = function(app) {
    //var app = require('../express');

    require('./services/user.service.server.js');
    require('./services/website.service.server.js');
    require('./services/widget.service.server.js');
    require('./services/page.service.server.js');

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