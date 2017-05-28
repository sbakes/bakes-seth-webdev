(function () {
    angular
        .module('WAM')
        .controller('pageListController', pageListController);

    function pageListController($location, pageService, $routeParams) {

        var pages = [
                { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
                { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
                { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
            ];

        var model = this;
        model.userId = $routeParams['userId'];
        model.pageId = $routeParams['webId'];
        model.pages = pages;

        function init() {
            model.page = pageService.findPageByCredentials(model.webId);
        }
        init();
    }
})();