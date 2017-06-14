module.exports = function () {

    var pageSchema = require("./page.schema.server.js")();
    var mongoose = require("mongoose");
    var page = mongoose.model("page", pageSchema);

    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage
    };
    return api;
    
    function createPage(websiteId, pageNew) {
        pageNew.websiteId = websiteId;
        return page.create(pageNew);
    }
    
    function deletePage(pageId) {
        return page.remove({_id: pageId});
    }
    
    function updatePage(pageId, pageNew) {
        return page.update(
            {_id: pageId},
            {$set:
                {
                    name: pageNew.name,
                    title: pageNew.title,
                    description: pageNew.description
                }}
        );
    }
    
    function findAllPagesForWebsite(websiteId) {
        return page.find({websiteId: websiteId});
    }
    
    function findPageById(pageId) {
        return page.findOne({_id: pageId});
    }
};