(function () {
    angular
        .module('WAM')
        .controller('pageEditController', pageEditController);

    function pageController($location, pageService, $routeParams) {

        var model = this;
        model.userId = $routeParams['userId'];
        var pageId = $routeParams['pageId'];

        model.page = pageService.findPageById(pageId);

        // event handlers
        model.createPage = createPage;
        model.updatePage = updatePage;
        model.deletePage = deletePage;

        function init() {
            model.page = pageService.findPageById(model.pageId);
        }
        init();

        // implementation
        function createPage(page) {
            page.developerId = model.userId;
            pageService.createPage(page);
            $location.url('/user/'+model.userId+'/page');
        }

        function updatePage(page) {
            pageService.updatePage();
        }

        function deletePage(pageId) {
            pageService.deletePage(pageId);
            $location.url('/user/'+model.userId+'/page');
        }
    }
})();