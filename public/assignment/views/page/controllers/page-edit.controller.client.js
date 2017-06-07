(function () {
    angular
        .module('WAM')
        .controller('pageEditController', pageEditController);

    function pageEditController($location, pageService, $routeParams) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];

        //model.page = pageService.findPageById(pageId);

        // event handlers
        model.updatePage = updatePage;
        model.deletePage = deletePage;

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


        function updatePage(page) {
            //pageService.updatePage();
            pageService
                .updatePage(page)
                .success(function(){
                    model.message("Successfully update page");
                })
                .error(function(){
                    model.error("Unable to update page");
                });
        }

        function deletePage(pageId) {
            //pageService.deletePage(pageId);
            //$location.url('/user/'+model.userId+'/page');
            pageService
                .deletePage(page)
                .success(function(){
                    model.message("Successfully deleted page");
                })
                .error(function(){
                    model.error("Unable to delete page");
                });
        }
    }
})();