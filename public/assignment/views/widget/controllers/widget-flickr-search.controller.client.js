(function () {
    angular
        .module('WAM')
        .controller('flickrController', flickrController);
    
    function flickrController($routeParams, flickrService) {
        var model = this;
        
        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;

        function init(){
            model.userId = $routeParams['userId'];
            model.websiteId = $routeParams['websiteId'];
            model.pageId = $routeParams['pageId'];
            model.widgetId = $routeParam['widgetId'];

            widgetService
                .findWidgetsByPageId(model.pageId)
                .then(function(widget){
                    model.widget = widget.data;
                }, function(error){
                    console.log(error);
                })

        }
        init();


        function selectPhoto(photo) {
            console.log(photo);
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url+="/"+photo.id+"_"+photo.secret+"_b.jpg";
            model.widget.url = url;
            model.widget.width = "100%";

            widgetService
                .updateWidget(model.widget._id,model.widget)
                .then(function (status) {
                    console.log("photo selected");
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
                }, function (error) {
                    console.log(error);
                });
        }
        
        function searchPhotos(searchTerm) {
            console.log(searchTerm);
            flickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    console.log(response.data);
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });
        }
    }
})();