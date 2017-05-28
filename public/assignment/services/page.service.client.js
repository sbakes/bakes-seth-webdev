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
            createUser: createPage,
            findUserByCredentials: findPageByWebsiteId,
            findUserById: findPageById,
            updateUser: updatePage,
            deleteUser: deletePage
        };

        function createPage(WebsiteId, page) {
            page._id = (new Date()).getTime() + "";
            pages.push(page);
        }

        function findPageByWebsiteId(websiteId) {
            var page = pages.find(function (page) {
                return page.websiteId === websiteid;
            });
        }

        function updatePage(pageId, page) {
            var page = pages.find(function (page) {
                return page.websiteId === websiteid;
            });
            var index = page.indexOf(page);
            pages.update(index, page);
        }

        function deletePage(pageId) {
            var page = pages.find(function (page) {
                return page._id === pageId;
            });
            var index = pages.indexOf(page);
            pages.splice(index, 1);
        }

        function findPageById(pageId) {
            return pages.find(function (page) {
                return page._id === pageId;
            });
        }
    }
})();