(function () {
    angular
        .module('WAM')
        .factory('pageService', pageService);

    function pageService() {

        var pages = [
                { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
                { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
                { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
            ]
        ;

        return {
            pages: pages,
            createPage: createPage,
            findPageByCredentials: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage,
            findAllPages: findAllPages
        };

        function createPage(websiteId, page) {
            page._id = (new Date()).getTime() + "";
            pages.push(page);
        }

        function findPageByWebsiteId(websiteId) {
            var page = pages.find(function (page) {
                return page.websiteId === websiteid;
            });
        }

        function updatePage(_id, page) {
            var page = pages.find(function (page) {
                return page.websiteId === websiteid;
            });
            var index = page.indexOf(page);
            pages.update(index, page);
        }

        function deletePage(_id) {
            var page = pages.find(function (page) {
                return page._id === pageId;
            });
            var index = pages.indexOf(page);
            pages.splice(index, 1);
        }

        function findPageById(_id) {
            return pages.find(function (page) {
                return page._id === pageId;
            });
        }

        function findAllPages() {
            var resultSet = [];
            for(var p in pages) {
                    resultSet.push(pages[p]);
            }
            return resultSet;
        }
    }
})();