(function () {
    angular
        .module('WAM')
        .controller('pageListController', pageListController);

    function pageListController($location, pageService, $routeParams) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        //model.pages = pages;

        function init() {
            //model.page = pageService.findPageByCredentials(model.websiteId);
            pageService
                .findAllPagesForWebsite(model.websiteId)
                .then(function(pages){
                    model.pages = pages.data;
                    console.log(pages);
                    console.log("Successfully gathered pages");
                },function(error){
                    console.log(error);
                    model.message = "error retrieving websites";
                })

        }
        init();
    }
})();