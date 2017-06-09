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
        console.log("creating websites");
        var website = req.body;
        website.created = (new Date());
        console.log(website);
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
            if (websites[w].developerId === userId) {
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
        console.log("---------------------------");
        var website = req.body;
        var websiteId = req.params.websiteId;

        console.log(websiteId);
        console.log(website);
        for (var w in websites) {
            if (websiteId === websites[w]._id) {
                console.log("found it!");
                var index = websites.indexOf(websites[w]);
                console.log(w);
                websites[index] = website;
                console.log(websites[w]);
                console.log(website);
                res.json(website);
                return;
            }
        }
        res.sendStatus(404);
    }

    function deleteWebsite(req,res){
        var websiteId = req.params.websiteId;
        console.log(websiteId)
        for (var w in websites) {
            if (websites[w]._id === websiteId) {
                console.log("found one");
                websites.splice(parseInt(w), 1);
                console.log("spliced");
            }
        }
        res.sendStatus(200);
    }
};