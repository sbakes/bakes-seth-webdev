(function () {
    angular
        .module('WAM')
        .factory('websiteService', websiteService);

    function websiteService($http) {

        var api = {
            findAllSourcesForUser: findAllSourcesForUser,
            findAllArticles:findAllArticles,
            createWebsite: createWebsite,
            findWebsiteById: findWebsiteById
        };
        return api;

        function findAllSourcesForUser(userId, category) {
            //console.log(category);
            var key = '97f8df9e43d24c71a6d7fb139d8acfba';
            var urlBase = 'https://newsapi.org/v1/sources?category=';
            var urlAdd = category;
            //console.log(urlAdd);
            var url = urlBase + urlAdd;
            //console.log(url);
            var sources = $http.get(url);
            //console.log(sources);
            //var url = "/api/user/" + userId + "/news";
            //var sources = $http.get("https://newsapi.org/v1/sources?");
            return sources
        }

        function createWebsite(userId, website) {
            var url = "/api/user/"+userId+"/website";
            return $http.post(url, website);
        }

        function findWebsiteById(websiteId) {
            var url = "/api/website/" + websiteId;
            return $http.get(url);
        }

        function findAllArticles(source){
            var key = '&apiKey=97f8df9e43d24c71a6d7fb139d8acfba';
            var urlBase = 'https://newsapi.org/v1/articles?source=';
            var url = urlBase + source + key;
            //console.log(url);
            var articles = $http.get(url);
            return articles;
        }
    }
})();