module.exports = function () {
    var mongoose = require("mongoose");

    var countrySchema = mongoose.Schema({
        _id: String,
        name: String
    }, {collection: "country"});

    return countrySchema;
};