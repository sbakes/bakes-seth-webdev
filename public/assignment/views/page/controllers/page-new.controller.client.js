(function () {
    angular
        .module('WAM')
        .controller('pageNewController', pageNewController);

    function pageController($location, pageService, $routeParams) {

        var model = this;
        var pageId = $routeParams['pageId'];
        model.userId = $routeParams['userId'];

        model.page = pageService.findPageById(pageId);
    }

    // event handlers
    model.createPage = createPage;

    function init() {
        model.pages = pageService.findPageByPageId(model.pageId);
    }
    init();

    // implementation
    function createPage(page) {
        page.developerId = model.userId;
        pageService.createPage(page);
        $location.url('/user/'+model.userId+'/page');
    }
})();