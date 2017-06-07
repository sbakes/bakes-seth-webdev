(function () {
    angular
        .module('WAM')
        .controller('flickrController', widgetController);
    
    function flickrController(flickrService) {
        var model = this;
        
        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;

        function init(){
            model.userId = $routeParams['userId'];
            model.websiteId = $routeParams['websiteId'];
            model.pageId = $routeParams['pageId'];
            model.widgetId = $routeParam['widgetId'];

            widgetService
                .findAllWidgetsForPage(model.pageId)
                .success(function(widgets){
                    model.widget = widget;
                })

        }
        init();

        function selectPhoto(photo) {
            console.log(photo);
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url+="/"+photo.id+"_"+photo.secret+"_b.jpg";
            vm.widget.url = url;
            vm.widget.width = "100%";

            WidgetService
                .updateWidget(vm.widget._id,vm.widget)
                .success(function (status) {
                    $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/' + vm.pageId + '/widget');
                })
                .error(function (error) {
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