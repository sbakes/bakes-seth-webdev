module.exports = function () {
    var mongoose = require('mongoose');
    mongoose.Promise = require('q').Promise;
    mongoose.connect('mongodb://localhost/assignment');
    console.log("connected");

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