module.exports = function () {

    var pageSchema = require("./page.schema.server.js")();
    var mongoose = require("mongoose");
    var page = mongoose.model("page", pageSchema);

    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage,
        findPageByAuthorId: findPageByAuthorId
    };
    return api;

    function findPageByAuthorId(username){
        console.log(username);
        return page.find({author: username})
    }
    
    function createPage(pageNew) {
        //pageNew.websiteId = websiteId;
        console.log(pageNew);
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
        console.log("in model server controller");
        return page.find({websiteId: websiteId});
    }
    
    function findPageById(pageId) {
        return page.findOne({_id: pageId});
    }
};