module.exports = function (app) {
    var multer = require('multer');
    var upload = multer({ dest: __dirname + '/../../public/uploads'});

    app.post('/api/page/:pageId/widget', createWidget);
    app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
    app.get('/api/widget/:widgetId', getWidgetById);
    app.put('/api/widget/:widgetId', updateWidget);
    app.delete('/api/widget/:widgetId', deleteWidget);
    app.post('/api/upload',upload.single('myFile'), uploadImage);
    //app.put('/api/reorder/:pageId/order/initial/:startIndex/final/:endIndex', updateOrder);

    var widgets = [
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "543", "widgetType": "FLICKR", "pageId": "321", "text": ""},
            { "_id": "543", "widgetType": "HEADING", "pageId": "789", "size": 2, "text": "GIZMODO"},
        ];

    function createWidget(req,res){
        var widget = req.body;
        widget._id = (new Date()).getTime();
        widgets.push(widget);
        res.send(page);
    }

    function findAllWidgetsForPage(req, res) {
        console.log("looking for widgets");
        var pageId = req.params.pageId;
        console.log(pageId);
        var widgetsFound = [];
        for (var w in widgets) {
            if (widgets[w].pageId === pageId){
                console.log("found one!");
                widgetsFound.push(widgets[w]);
            }
        }
        res.json(widgetsFound);
        console.log("done searching for widgets");
    }

    function getWidgetById(req,res) {
        var widgetId = req.body;
        for (var w in widgets) {
            if (widgets[w]._id === widgetId) {
                res.send(widgets[w]);
                return;
            }
        }
    }

    function updateWidget(req,res) {
        var widget = req.body;
        for (var w in widgets) {
            if (widgets[w]._id === widget) {
                widgets[w] = widget;
            }
        }
        res.send(200);
    }

    function deleteWidget(req,res){
        var widgetId = req.params.widgetId;
        for (var w in widgets) {
            if (widgets[w]._id === widgetId) {
                widgets.splice(parseInt(w), 1);
            }
        }
        res.send(200);
    }

    function uploadImage(req, res) {
        console.log("photo received");
        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var myFile = req.file;
        var widgetName = req.body.widgetName;
        var widgetOperation = req.body.widgetOperation;

        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;

        var originalname = myFile.originalname; // file name on user's computer
        var filename = myFile.filename;
        var url = '/uploads/' + filename; // new file name in upload folder
        var path = myFile.path;         // full path of uploaded file
        var destination = myFile.destination;  // folder where file is saved to
        var size = myFile.size;
        var mimetype = myFile.mimetype;

        //res.json(myFile);
        res.redirect("#!/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget");

        //var callbackUrl = "#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget";
    }

};