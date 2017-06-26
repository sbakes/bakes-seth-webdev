(function () {
    angular
        .module('WAM')
        .factory('pageService', pageService);

    function pageService($http) {

        return {
            createPage: createPage,
            findPageByCredentials: findPageByWebsiteId,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage,
            findAllPagesForWebsite: findAllPagesForWebsite
        };

        function createPage(websiteId, page) {
            //console.log(page.websiteId);
            page._id = (new Date()).getTime() + "";
            var url = "/api/website/" + websiteId + "/page";
            //console.log(url);
            //console.log("------")
            console.log(page);
            return $http.post(url, page);
        }

        function findPageByWebsiteId(websiteId) {
            var url = "/api/website/"+websiteId+"/page";
            //console.log(url);
            return $http.get(url);
        }

        function updatePage(pageId, page) {
            var url = "/api/page/" + pageId;
            console.log(url);
            return $http.put(url, page);
        }

        function deletePage(pageId) {
            var url = "/api/page/" + pageId;
            console.log(url);
            return $http.delete(url);
        }

        function findPageById(pageId) {
            var url = "/api/page/" + pageId;
            console.log(url);
            return $http.get(url);
        }

        function findAllPagesForWebsite(websiteId) {
            console.log("in service controller");
            var url = "/api/website/"+websiteId+"/page";
            console.log(url);
            return $http.get(url);
        }
    }
})();