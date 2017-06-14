module.exports = function () {

    var websiteSchema = require("./website.schema.server.js")();
    var mongoose = require("mongoose");
    var website = mongoose.model("website", websiteSchema);

    var api = {
        createWebsiteForUser: createWebsiteForUser,
        deleteWebsite: deleteWebsite,
        updateWebsite: updateWebsite,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById
    };
    return api;
    
    function createWebsiteForUser(userId, websiteNew) {
        websiteNew._user = userId;
        console.log(userId);
        return website.create(websiteNew);
    }
    
    function deleteWebsite(websiteId) {
        return website.remove({_id: websiteId});
    }
    
    function updateWebsite(websiteId, websiteNew) {
        return website.update(
            {_id: websiteId},
            {$set:
                {
                    name: websiteNew.name,
                    description: websiteNew.description
                }}
        );
    }
    
    function findAllWebsitesForUser(userId) {
        return website.find({developerId: userId});
    }
    
    function findWebsiteById(websiteId) {
        return website.findOne({_id: websiteId});
    }
};