module.exports = function (app, model) {
    app.post('/api/website/:websiteId/page', createPage);
    app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    app.get('/api/page/:pageId', findPageById);
    app.put('/api/page/:pageId', updatePage);
    app.delete('/api/page/:pageId', deletePage);

    var pageModel = model.pageModel;

    // var pages = [
    //         { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    //         { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    //         { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" },
    //         { "_id": "543", "name": "Bob's Post", "websiteId": "234", "description": "Lorem" },
    //         { "_id": "234", "name": "Bob's Post", "websiteId": "334", "description": "Lorem" }
    //     ];

    function createPage(req,res){
        console.log("creating pages");
        var pageNew = req.body;
        // page.created = (new Date());
        // console.log(page);
        // pages.push(page);
        // res.send(page);
        pageModel
            .createPage(pageNew.websiteId, pageNew)
            .then(
                function (page) {
                    console.log("page created");
                    res.send(page);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );

    }

    function findAllPagesForWebsite(req, res) {
        console.log("looking for pages");
        var websiteId = req.params.websiteId;
        console.log(websiteId);
        // var pagesFound = [];
        // for (var p in pages) {
        //     if (pages[p].websiteId === websiteId) {
        //         console.log("found one!");
        //         pagesFound.push(pages[p]);
        //     }
        // }
        // res.json(pagesFound);
        pageModel
            .findAllPagesForWebsite(websiteId)
            .then(
                function (pages) {
                    console.log("pages found");
                    console.log(pages);
                    res.json(pages);
                },
                function (error) {
                    console.log("failed to find websites");
                    //console.log(error);
                    res.status(400).send(error);
                }
            );
    }

    function findPageById(req,res) {
        var pageId = req.params.pageId;
        pageModel
            .findPageById(pageId)
            .then(
                function (page) {
                    console.log("page found");
                    res.send(page);
                },
                function (error) {
                    res.send(error);
                }
            )
    }

    function updatePage(req,res){
        console.log("---------------------------");
        var page = req.body;
        var pageId = req.params.pageId;
        console.log(pageId);
        console.log(page);
        // for (var p in pages) {
        //     if (pageId === pages[p]._id) {
        //         console.log("found it!");
        //         var index = pages.indexOf(pages[p]);
        //         console.log(p);
        //         pages[index] = page;
        //         console.log(pages[p]);
        //         console.log(page);
        //         res.json(page);
        //         return;
        //     }
        // }
        // res.sendStatus(404);
        pageModel
            .updatePage(pageId, page)
            .then(
                function (page) {
                    console.log("page updated");
                    res.send(200);
                },
                function (error) {
                    res.status(400).send(error);
                }
            )
    }

    function deletePage(req,res) {
        var pageId = req.params.pageId;
        console.log(pageId);
        // for (var p in pages) {
        //     if (pages[p]._id === pageId) {
        //         console.log("found one");
        //         pages.splice(parseInt(p), 1);
        //         console.log("spliced");
        //     }
        // }
        // res.sendStatus(200);
        pageModel
            .deletePage(pageId)
            .then(
                function (page) {
                    res.send(200);
                },
                function (error) {
                    res.status(400).send(error);
                }
            )
    }
};