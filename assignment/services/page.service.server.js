module.exports = function (app) {
    app.post('/api/website/:websiteId/page', createPage);
    app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    app.get('/api/page/:pageId', findPageById);
    app.put('/api/page/:pageId', updatePage);
    app.delete('/api/page/:pageId', deletePage);

    var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Bob's Post", "websiteId": "234", "description": "Lorem" },
            { "_id": "234", "name": "Bob's Post", "websiteId": "334", "description": "Lorem" }
        ];

    function createPage(req,res){
        var newPage = req.body;

    }

    function findAllPagesForWebsite(req, res) {
        console.log("looking for pages");
        var websiteId = req.params.websiteId;
        console.log(websiteId);
        var pagesFound = [];
        for (var p in pages) {
            if (pages[p].websiteId === websiteId) {
                console.log("found one!");
                pagesFound.push(pages[p]);
            }
        }
        res.json(pagesFound);
        console.log("done looking for pages");
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
        var pageId = req.params.pageId
        for (var p in pages) {
            if (pages[p]._id === pageId) {
                pages[p] = page;
            }
        }
        res.send(200);
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