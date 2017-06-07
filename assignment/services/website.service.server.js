module.exports = function (app,model) {
    app.post('/api/user/:userId/website',createWebsite);
    app.get('/api/user/:userId/website', findAllWebsitesForUser);
    app.get('/api/website/:websiteId', findWebsiteById);
    app.put('/api/website/:websiteId', updateWebsite);
    app.delete('/api/website/:websiteId', deleteWebsite);

    var websiteModel = model.websiteModel;
    var userModel = model.userModel;

    var websites = [
        {"_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem", created: new Date() },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem", created: new Date() },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem", created: new Date() },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem", created: new Date() },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem", created: new Date() },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem", created: new Date() }
    ];

    function createWebsite(req,res){
        var newWebsite = req.body;
        // newWebsite._id = (new Date()).getTime() + "";
        newWebsite.created = new Date();

        var tempWebsite = {};
        tempWebsite.name = newWebsite.name;
        tempWebsite.description = newWebsite.description;
        tempWebsite.pages = [];
        tempWebsite.dateCreated = newWebsite.created;
        tempWebsite._user = newWebsite.developerId;

        websiteModel
            .createWebsiteForUser(newWebsite.developerId,tempWebsite)
            .then(function (website) {
                    res.json(website);
                },
                function (error) {
                    res.sendStatus(500);
                });
    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;

        websiteModel
            .findAllWebsitesForUser(userId)
            .then(function (websites) {
                    res.json(websites);
                },
                function (error) {
                    res.sendStatus(500);
                });
    }

    function findWebsiteById(req,res) {
        var websiteId = req.params.websiteId;
        websiteModel
            .findWebsiteById(websiteId)
            .then(function (websites) {
                    res.json(websites);
                },
                function (error) {
                    res.sendStatus(500);
                });
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

        websiteModel.deleteWebsite(websiteId)
            .then(function (website) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(404);
                });
    }
};