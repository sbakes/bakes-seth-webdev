(function () {
    angular
        .module('WAM')
        .factory('websiteService', websiteService);

    function websiteService($http) {

        var api = {
            createWebsite: createWebsite,
            findAllWebsitesForUser: findAllWebsitesForUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        };
        return api;

        function createWebsite(userId, website) {
            var url = "/api/user/"+userId+"/website";
            return $http.post(url, website);
        }

        function updateWebsite(websiteId, website) {
            var url = "/api/website/" + websiteId;
            console.log(url);
            return $http.put(url, newWebsite);
        }

        function deleteWebsite(websiteId) {
            var url = "/api/website/" + websiteId;
            return $http.delete(url);
        }

        function findWebsiteById(websiteId) {
            var url = "/api/website/" + websiteId;
            return $http.get(url);
        }

        function findAllWebsitesForUser(userId) {
            var url = "/api/user/" + userId + "/website";
            console.log(url);
            return $http.get(url);
        }
    }
})();