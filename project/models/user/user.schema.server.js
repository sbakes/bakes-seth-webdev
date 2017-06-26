module.exports = function () {
    var mongoose = require("mongoose");
    
    var userSchema = mongoose.Schema({
        _id: String,
        facebook: {
            id:    String,
            token: String
        },
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        admin: ["TRUE", "FALSE"],
        phone: String,
        sources: [{type: String}],
        categories: [{type: String}],
        languages: [{type: String}],
        countries: [{type: String}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "user"});

    var categorySchema = mongoose.Schema({
        _id: String,
        name: String
    }, {collection: "category"});

    var languageSchema = mongoose.Schema({
        _id: String,
        name: String
    }, {collection: "language"});

    var countrySchema = mongoose.Schema({
        _id: String,
        name: String
    }, {collection: "country"});

    return userSchema;
};