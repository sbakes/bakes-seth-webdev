(function () {
    angular
        .module('WAM')
        .service('flickrService', flickrService);
    
    function flickrService($http) {
        this.searchPhotos = searchPhotos;

        var key = "1cb17dae92d33c89d6d3754cf88bb007";
        var secret = "c9fc752f8f26401c";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        function searchPhotos(searchTerm) {
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }

    function selectPhoto(photo) {
        var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
        url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
        widgetService
            .updateWidget(websiteId, pageId, widgetId, {url: url})
            .then(function(success){
                console.log(success);
                $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
            },function (error) {
                console.log(error)
            });
    }

})();