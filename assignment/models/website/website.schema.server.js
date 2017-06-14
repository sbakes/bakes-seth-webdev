module.exports = function () {
    var mongoose = require("mongoose");
    
    var websiteSchema = mongoose.Schema({
        _id: String,
        _user: {type: mongoose.Schema.Types.ObjectId, ref:'user'},
        name: String,
        developerId: String,
        description: String,
        pages: [{type: mongoose.Schema.Types.ObjectId, ref:'page'}],
        dateCreated: {type: Date, default: Date.now},
        dateUpdated: {type: Date},
    }, {collection: "website"});

    return websiteSchema;
};