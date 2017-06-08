module.exports = function (app) {

    app.post('/api/user/:userId/website',createWebsite);
    app.get('/api/user/:userId/website', findAllWebsitesForUser);
    app.get('/api/website/:websiteId', findWebsiteById);
    app.put('/api/website/:websiteId', updateWebsite);
    app.delete('/api/website/:websiteId', deleteWebsite);

    var websites = [
        {"_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem", created: new Date() },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem", created: new Date() },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem", created: new Date() },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem", created: new Date() },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem", created: new Date() },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem", created: new Date() }
    ];

    function createWebsite(req,res){
        var website = req.body;
        websites.push(website);
        res.send(websites);
        console.log("website created");
    }

    function findAllWebsitesForUser(req, res) {
        console.log("looking for websites");
        var userId = req.params.userId;
        console.log(userId);
        var foundWebsites = [];
        for (var w in websites) {
            if (websites[w]._id === userId) {
                console.log('found one');
                foundWebsites.push(websites[w]);
            }

        }
        console.log("done looking for websites");
        res.json(foundWebsites);
    }

    function findWebsiteById(req,res) {
        var websiteId = req.params.websiteId;
        //var websiteId = parseInt(req.params.websiteId);
        for (var w in websites) {
            if (websites[w]._id === websiteId) {
                res.send(websites[w]);
                return;
            }
        }
        res.send('0');
    }


    function updateWebsite(req,res){
        var website = req.body;
        var websiteId = req.params.websiteId;

        websiteModel.updateWebsite(websiteId,website)
            .then(function (website) {
                    res.json(website);
                },
                function (error) {
                    res.sendStatus(404);
                });
    }

    function deleteWebsite(req,res){
        var websiteId = req.params.websiteId;
        for (var w in websites) {
            if (websites[w]._id === websiteId) {
                websites.splice(parseInt(w), 1);
            }
        }
        res.send(200);
    }
};