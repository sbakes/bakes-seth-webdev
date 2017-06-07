(function () {
    angular
        .module('WAM')
        .controller('pageNewController', pageNewController);

    function pageNewController($location, pageService, $routeParams) {

        var model = this;
        model.pageId = $routeParams['pageId'];
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParam['websiteId'];

        //model.page = pageService.findPageById(pageId);
    }

    // event handlers
    model.createPage = createPage;

    function init() {
        //model.page = pageService.findPageById(model.pageId);
        pageService
            .findAllPages()
            .success(function(){
                model.pages = pages;
            });
        pageService
            .findPageByWebsiteId(websiteId)
            .success(function(){
                model.page = page;
            });
    }
    init();

    // implementation
    function createPage(page) {
        page.developerId = model.userId;
        pageService
            .createPage(page)
            .success(function(page){
                model.message("Successfully created page")
                $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page'+model.pageId);
                ///user/:userId/website/:websiteId/page/pageId
            })
            .error(function(page){
                model.message("Unable to create page")
            })
        //pageService.createPage(page);
    }
})();