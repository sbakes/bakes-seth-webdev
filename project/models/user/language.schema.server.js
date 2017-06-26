module.exports = function () {
    var mongoose = require("mongoose");

    var languageSchema = mongoose.Schema({
        _id: String,
        name: String
    }, {collection: "language"});

    return languageSchema;
};