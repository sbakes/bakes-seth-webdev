(function () {
    angular
        .module('WAM')
        .service('flickrService', flickrService);
    
    function flickrService($http) {

        this.searchPhotos = searchPhotos;

        var key = "95a749a852b4e95944cca092880cecf3";
        var secret = "18b9ebe6513c06e2";
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
        WidgetService
            .updateWidget(websiteId, pageId, widgetId, {url: url})
            .success(function(){
                $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
            })
            .error(function () {

            });

    }

})();