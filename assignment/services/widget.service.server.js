module.exports = function (app, models) {
    var multer = require('multer');
    var upload = multer({ dest: __dirname + '/../../public/uploads'});
    var widgetModel = models.widgetModel;

    app.post('/api/page/:pageId/widget', createWidget);
    app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
    app.get('/api/widget/:widgetId', getWidgetById);
    app.put('/api/widget/:widgetId', updateWidget);
    app.delete('/api/widget/:widgetId', deleteWidget);
    app.post('/api/upload', upload.single('myFile'), uploadImage);
    //app.put('/api/reorder/:pageId/order/initial/:startIndex/final/:endIndex', updateOrder);

    // var widgets = [
    //         { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    //         { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    //         { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
    //             "url": "http://lorempixel.com/400/200/"},
    //         { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    //         { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    //         { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
    //             "url": "https://youtu.be/AM2Ivdi9c4E" },
    //         { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    //         { "_id": "543", "widgetType": "FLICKR", "pageId": "321", "text": ""},
    //         { "_id": "543", "widgetType": "HEADING", "pageId": "789", "size": 2, "text": "GIZMODO"},
    //     ];

    function createWidget(req,res){
        var widgetNew = req.body;
        console.log(widgetNew);
        widgetNew._id = (new Date()).getTime();
        console.log(widgetNew._id);
        // widgets.push(widget);
        // res.send(page);
        widgetModel
            .createWidget(widgetNew.pageId, widgetNew)
            .then(
                function (widget) {
                    res.send(widget);
                },
                function (error) {
                    console.log(error);
                    res.status(400).send(error);
                }
            );
    }

    function findAllWidgetsForPage(req, res) {
        console.log("looking for widgets");
        var pageId = req.params.pageId;
        console.log(pageId);
        // var widgetsFound = [];
        // for (var w in widgets) {
        //     if (widgets[w].pageId === pageId){
        //         console.log("found one!");
        //         widgetsFound.push(widgets[w]);
        //     }
        // }
        // res.json(widgetsFound);
        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(
                function (widgets) {
                    res.send(widgets);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
        console.log("done searching for widgets");
    }

    function getWidgetById(req,res) {
        var widgetId = req.params.widgetId;
        console.log("widgetId: " + widgetId);
        // for (var w in widgets) {
        //     if (widgets[w]._id === widgetId) {
        //         res.send(widgets[w]);
        //         return;
        //     }
        // }
        widgetModel
            .findWidgetById(widgetId)
            .then(
                function (widget) {
                    console.log("found widget");
                    res.send(widget);
                },
                function (error) {
                    console.log("Unable to find widget");
                    res.status(400).send(error);
                }
            )
    }

    function updateWidget(req,res) {
        var widget = req.body;
        var widgetId = widget._id;
        // for (var w in widgets) {
        //     if (widgets[w]._id === widget) {
        //         widgets[w] = widget;
        //     }
        // }
        // res.send(200);
        widgetModel
            .updateWidget(widgetId, widget)
            .then(function (widget) {
                    console.log(widget);
                    res.send(200);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
    }

    function deleteWidget(req,res){
        var widgetId = req.params.widgetId;
        // for (var w in widgets) {
        //     if (widgets[w]._id === widgetId) {
        //         widgets.splice(parseInt(w), 1);
        //     }
        // }
        // res.send(200);
        widgetModel
            .deleteWidget(widgetId)
            .then(
                function (widget) {
                    res.send(200);
                },
                function (error) {
                    res.status(400).send(error);
                }
            )
    }

    function uploadImage(req, res) {
        var widgetId = req.body.widgetId;
        var userId = req.body.userId;
        var pageId = req.body.pageId;
        var websiteId = req.body.websiteId;

        var myFile = req.file;

        for (var i in widgets) {
            if (widgets[i]._id === widgetId) {
                widgets[i].url = "/uploads/"+myFile.filename;
            }
        }

        res.redirect("/assignment/#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
    }

};