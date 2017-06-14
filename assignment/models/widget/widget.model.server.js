module.exports = function () {

    var widgetSchema = require("./widget.schema.server.js")();
    var mongoose = require("mongoose");
    var widget = mongoose.model("widget", widgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget
    };
    return api;
    
    function createWidget(pageId, widgetNew) {
        //widgetNew._page = pageId;
        widgetNew.pageId = pageId;
        return widget
            .find({pageId: pageId})
            .then(
                function (widgets) {
                    widgetNew.order = widgets.length;
                    console.log(widgetNew.order);
                    return widget.create(widgetNew);
                },
                function (error) {
                    return null;
                }
            );
    }
    
    function deleteWidget(widgetId) {
        return widget.remove({_id: widgetId});
    }
    
    function updateWidget(widgetId, widgetUpdate) {
        switch(widgetUpdate.widgetType) {
            case "HEADING":
                return widget.update(
                    {_id: widgetId},
                    {$set:
                    {
                        text: widgetUpdate.text,
                        size: widgetUpdate.size
                    }}
                );
                break;
            case "IMAGE":
                return widget.update(
                    {_id: widgetId},
                    {$set:
                    {
                        name: widgetUpdate.name,
                        text: widgetUpdate.text,
                        url: widgetUpdate.url,
                        width: widgetUpdate.width
                    }}
                );
                break;
            case "HTML":
                return widget.update(
                    {_id: widgetId},
                    {$set:
                    {
                        name: widgetUpdate.name,
                        text: widgetUpdate.text
                    }}
                );
                break;
            case "YOUTUBE":
                return widget.update(
                    {_id: widgetId},
                    {$set:
                    {
                        name: widgetUpdate.name,
                        text: widgetUpdate.text,
                        url: widgetUpdate.url,
                        width: widgetUpdate.width,
                        height: widgetUpdate.height
                    }}
                );
                break;
            case "TEXT":
                return widget.update(
                    {_id: widgetId},
                    {$set:
                    {
                        name: widgetUpdate.name,
                        rows: widgetUpdate.rows,
                        placeholder: widgetUpdate.placeholder,
                        formatted: widgetUpdate.formatted
                    }}
                );
                break;
            default:
                console.log(widgetUpdate);
        }
    }
    
    function findAllWidgetsForPage(pageId) {
        console.log(pageId);
        return widget.find({pageId: pageId});
    }
    
    function findWidgetById(widgetId) {
        console.log("widgetId");
        return widget.findOne({_id: widgetId});
    }
    
    function reorderWidget(pageId, startIndex, endIndex) {
        //TODO
    }
};