module.exports = function () {
    var mongoose = require("mongoose");

    var categorySchema = mongoose.Schema({
        _id: String,
        name: String
    }, {collection: "category"});

    return categorySchema;
};