module.exports = function (app, models) {


    var websiteModel = models.websiteModel;
    app.post('/api/user/:userId/website',createWebsite);
    app.get('/api/website/:websiteId', findWebsiteById);

    function createWebsite(req,res){
        //console.log("creating websites");
        var websiteNew = req.body;
        var userId = websiteNew.developerId;
        //console.log(websiteNew);
        websiteNew.created = (new Date());
        //console.log(websiteNew);
        //console.log(userId);
        // websites.push(website);
        // res.send(websites);
        websiteModel
            .createWebsiteForUser(userId, websiteNew)
            .then(
                function (website) {
                    console.log("website created");
                    res.send(website);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
    }

    function findWebsiteById(req,res) {
        var websiteId = req.params.websiteId;
        //console.log("websiteId: " + websiteId);
        //var websiteId = parseInt(req.params.websiteId);
        // for (var w in websites) {
        //     if (websites[w]._id === websiteId) {
        //         res.send(websites[w]);
        //         return;
        //     }
        // }
        // res.send('0');
        websiteModel
            .findWebsiteById(websiteId)
            .then(function (website) {
                    //console.log(website);
                    if(website === null) {
                        res.sendStatus(400);
                    }
                    res.send(website);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
    }

};