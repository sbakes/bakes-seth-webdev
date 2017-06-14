module.exports = function () {
    var mongoose = require("mongoose");
    
    var widgetSchema = mongoose.Schema({
        _id: String,
        pageId: String,
        _page: {type: mongoose.Schema.Types.ObjectId, ref:'page'},
        widgetType: {type: String, enum: ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'TEXT']},
        name: String,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        rows: Number,
        size: Number,
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        order: Number,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "widget"});

    return widgetSchema;
};