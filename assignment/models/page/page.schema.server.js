var mongoose = require("mongoose");

module.exports = function () {
    var pageSchema = mongoose.Schema({
        _id: String,
        _website: {type: mongoose.Schema.Types.ObjectId, ref:'website'},
        name: String,
        title: String,
        description: String,
        websiteId: String,
        widgets: [{type: mongoose.Schema.Types.ObjectId, ref:'widget'}],
        dateCreated: {type: Date, default: Date.now},
        dateUpdated: {type: Date},
    }, {collection: "page"});

    return pageSchema;
};