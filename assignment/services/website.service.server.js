module.exports = function (app, models) {

    var websiteModel = models.websiteModel;

    app.post('/api/user/:userId/website',createWebsite);
    app.get('/api/user/:userId/website', findAllWebsitesForUser);
    app.get('/api/website/:websiteId', findWebsiteById);
    app.put('/api/website/:websiteId', updateWebsite);
    app.delete('/api/website/:websiteId', deleteWebsite);

    // var websites = [
    //     {"_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem", created: new Date() },
    //     { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem", created: new Date() },
    //     { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem", created: new Date() },
    //     { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem", created: new Date() },
    //     { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem", created: new Date() },
    //     { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem", created: new Date() }
    // ];

    function createWebsite(req,res){
        console.log("creating websites");
        var websiteNew = req.body;
        var userId = req.query.userId;
        console.log(websiteNew);
        websiteNew.created = (new Date());
        console.log(websiteNew);
        console.log(userId);
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

    function findAllWebsitesForUser(req, res) {
        console.log("looking for websites");
        var userId = req.params.userId;
        console.log(userId);
        // var foundWebsites = [];
        // for (var w in websites) {
        //     if (websites[w].developerId === userId) {
        //         console.log('found one');
        //         foundWebsites.push(websites[w]);
        //     }
        //
        // }
        // console.log("done looking for websites");
        // res.json(foundWebsites);
        websiteModel
            .findAllWebsitesForUser(userId)
            .then(
                function (websites) {
                    console.log("done looking for websites");
                    res.send(websites)
                },
                function (error) {
                    res.status(400).send(error);
                }
            )
    }

    function findWebsiteById(req,res) {
        var websiteId = req.params.websiteId;
        console.log(websiteId);
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
            .then(
                function (website) {
                    console.log("website found");
                    res.send(website);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
    }


    function updateWebsite(req,res){
        console.log("---------------------------");
        var website = req.body;
        var websiteId = req.params.websiteId;

        console.log(websiteId);
        console.log(website);
        // for (var w in websites) {
        //     if (websiteId === websites[w]._id) {
        //         console.log("found it!");
        //         var index = websites.indexOf(websites[w]);
        //         console.log(w);
        //         websites[index] = website;
        //         console.log(websites[w]);
        //         console.log(website);
        //         res.json(website);
        //         return;
        //     }
        // }
        // res.sendStatus(404);
        websiteModel
            .updateWebsite(websiteId, website)
            .then(
                function (user) {
                    console.log("website updated");
                    res.send(200);
                },
                function (error) {
                    res.status(404).send("Unable to update website with ID: "+websiteId);
                }
            )
    }

    function deleteWebsite(req,res){
        var websiteId = req.params.websiteId;
        console.log(websiteId);
        // for (var w in websites) {
        //     if (websites[w]._id === websiteId) {
        //         console.log("found one");
        //         websites.splice(parseInt(w), 1);
        //         console.log("spliced");
        //     }
        // }
        // res.sendStatus(200);
        websiteModel
            .deleteWebsite(websiteId)
            .then(
                function (website) {
                    console.log("website deleted");
                    res.send(200);
                },
                function (error) {
                    res.status(400).send("Unable to delete website with ID: "+websiteId);
                }
            );
    }
};