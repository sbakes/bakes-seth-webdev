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
                    console.log(error);
                });
        }

        init();

        // implementation
        function createPage(pageName, pageDescription) {

            if (name === undefined) {
                console.log("no name found");
                model.error = 'Page must have a name';
                return;
            };

            n = new Date().getTime(); //so every page has a unique id

            var pageNew = {
                name: pageName,
                description: pageDescription,
                developerId: model.userId,
                websiteId: model.websiteId,
                _id: model.websiteId+n

            };
            pageService
                .createPage(pageNew, model.websiteId)
                .then(function (success) {
                    //model.message("Successfully created page");
                    console.log(success);
                    console.log(model.userId);
                    console.log(model.websiteId);
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
                    ///user/:userId/website/:websiteId/page/pageId
                },function (error) {
                    //model.message("Unable to create page")
                });
            //pageService.createPage(page);
        }
    }
})();