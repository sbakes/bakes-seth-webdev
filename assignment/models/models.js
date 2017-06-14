module.exports = function () {
    var mongoose = require('mongoose');
    mongoose.Promise = require('q').Promise;
    //mongoose.connect('mongodb://localhost/assignment');
    console.log("connected");

    var connectionString = 'mongodb://127.0.0.1:27017/assignment'; // for local


    if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
        var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
        var password = process.env.MLAB_PASSWORD_WEBDEV;
        connectionString = 'mongodb://' + username + ':' + password;
        connectionString += '@ds137261.mlab.com:37261/heroku_pfnnhb14'; // user yours
    }

    if(process.env.MLAB_USERNAME) {
        connectionString = process.env.MLAB_USERNAME + ":" +
            process.env.MLAB_PASSWORD + "@" +
            process.env.MLAB_HOST + ':' +
            process.env.MLAB_PORT + '/' +
            process.env.MLAB_APP_NAME;
    }

    mongoose.connect(connectionString);


    var userModel = require("./user/user.model.server.js")();
    var websiteModel = require("./website/website.model.server.js")();
    var pageModel = require("./page/page.model.server.js")();
    var widgetModel = require("./widget/widget.model.server.js")();
    
    var models = {
        userModel: userModel,
        websiteModel: websiteModel,
        pageModel: pageModel,
        widgetModel: widgetModel
    };
    
    return models;
};