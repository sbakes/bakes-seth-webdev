(function () {
    angular
        .module('WAM')
        .controller('pageNewController', pageNewController);

    function pageNewController($location, pageService, $routeParams) {

        var model = this;
        model.pageId = $routeParams['pageId'];
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];

        //model.page = pageService.findPageById(pageId);

        // event handlers
        model.createPage = createPage;

        function init() {
            //model.page = pageService.findPageById(model.pageId);
            pageService
                .findAllPagesForWebsite(model.websiteId)
                .then(function(pages){
                    model.pages = pages.data;
                    console.log(pages);
                    console.log("Successfully gathered pages");
                },function(error){
                    console.log(error);
                    model.message = "error retrieving websites";
                });
            pageService
                .findPageByWebsiteId(model.websiteId)
                .then(function (page) {
                    model.page = page.data;
                }, function(error){
                    console.log(erro);
                });
        }

        init();

        // implementation
        function createPage(page) {
            page.developerId = model.userId;
            pageService
                .createPage(page)
                .success(function (page) {
                    model.message("Successfully created page")
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page' + model.pageId);
                    ///user/:userId/website/:websiteId/page/pageId
                })
                .error(function (page) {
                    model.message("Unable to create page")
                })
            //pageService.createPage(page);
        }
    }
})();