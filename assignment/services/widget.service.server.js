module.exports = function (app,model) {
    var multer = require('multer');
    var upload = multer({ dest: __dirname + '/../../public/uploads'});

    var widgetModel = model.widgetModel;

    app.post('/api/page/:pageId/widget', createWidget);
    app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
    app.get('/api/widget/:widgetId', findWidgetById);
    app.put('/api/widget/:widgetId', updateWidget);
    app.delete('/api/widget/:widgetId', deleteWidget);
    app.post('/api/upload',upload.single('myFile'), uploadImage);
    app.put('/api/reorder/:pageId/order/initial/:startIndex/final/:endIndex', updateOrder);

    var widgets = [
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

    function createWidget(req,res){
        var newWidget = req.body;
        var pageId = req.params.pageId;
        newWidget._page = pageId;

        widgetModel.createWidget(pageId,newWidget)
            .then(function (wdg) {
                    res.json(wdg);
                },
                function (error) {
                    res.sendStatus(500);
                });
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;

        widgetModel.findAllWidgetsForPage(pageId)
            .then(function (newwidgets) {
                    res.json(newwidgets);
                },
                function (error) {
                    res.send(404);
                });
    }

    function findWidgetById(req,res) {
        var widgetId = req.params.widgetId;

        widgetModel.findWidgetById(widgetId)
            .then(function (widget) {
                    res.json(widget);
                },
                function (error) {
                    res.sendStatus(404);
                });
    }

    function updateWidget(req,res){
        var widget = req.body;
        var widgetId = req.params.widgetId;

        widgetModel.updateWidget(widgetId,widget)
            .then(function (widget) {
                    res.json(widget);
                },
                function (error) {
                    res.send(500);
                });
    }

    function deleteWidget(req,res){
        var widgetId = req.params.widgetId;

        widgetModel.deleteWidget(widgetId)
            .then(function (widget) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.send(404);
                });
    }

    function uploadImage(req, res) {

        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;
        var widgetName    = req.body.widgetName;
        var widgetOperation = req.body.widgetOperation;

        var userId        = req.body.userId;
        var websiteId     = req.body.websiteId;
        var pageId        = req.body.pageId;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        widget = getWidgetById(widgetId);
        widget.url = '/uploads/'+filename;

        var callbackUrl   = "/assignment/#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget";

        if(widgetOperation == "edit"){
            widgetModel.findWidgetById(widgetId)
                .then(function (widget) {
                    widget.url= "../../../../../uploads/"+filename;
                    widget.save();
                    res.redirect("../.."+callbackUrl);
                });
        }else{
            widget={};
            widget._page=pageId;
            widget.type="IMAGE";
            widget.name=widgetName;
            widget.width="100%";
            widget.url="../../../../../uploads/"+filename;
            widgetModel.createWidget(pageId,widget);
            res.redirect("../.."+callbackUrl);
        }
    }

    function updateOrder(req,res) {
        var pageId = req.params.pageId;
        var startIndex = req.params.startIndex;
        var endIndex = req.params.endIndex;
        widgetModel.reorderWidget(pageId,startIndex,endIndex)
            .then(function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(500);
                });
    }

};