module.exports = function (app,model) {
    app.post('/api/website/:websiteId/page', createPage);
    app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    app.get('/api/page/:pageId', findPageById);
    app.put('/api/page/:pageId', updatePage);
    app.delete('/api/page/:pageId', deletePage);

    var pageModel = model.pageModel;

    var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];

    function createPage(req,res){
        var newPage = req.body;
        newPage.created = new Date();

        var tempPage = {};
        tempPage.name = newPage.name;
        tempPage.title = newPage.title;
        tempPage.description = newPage.description;
        tempPage.widgets = [];
        tempPage.dateCreated = newPage.created;
        tempPage._website = newPage.websiteId;

        pageModel
            .createPageForWebsite(newPage.websiteId,tempPage)
            .then(function (page) {
                    res.json(page);
                },
                function (error) {
                    res.sendStatus(500);
                });
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params.websiteId;

        pageModel
            .findAllPagesForWebsite(websiteId)
            .then(function (pages) {
                    res.json(pages);
                },
                function (error) {
                    res.sendStatus(500);
                });
    }

    function findPageById(req,res) {
        var pageId = req.params.pageId;
        pageModel
            .findPageById(pageId)
            .then(function (pages) {
                    res.json(pages);
                },
                function (error) {
                    res.sendStatus(500);
                });
    }

    function updatePage(req,res){
        var page = req.body;
        var pageId = req.params.pageId;

        pageModel.updatePage(pageId,page)
            .then(function (page) {
                    res.json(page);
                },
                function (error) {
                    res.sendStatus(404);
                });
    }

    function deletePage(req,res){
        var pageId = req.params.pageId;

        pageModel.deletePage(pageId)
            .then(function (page) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(404);
                });
    }
};