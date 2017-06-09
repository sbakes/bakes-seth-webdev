(function () {
    angular
        .module('WAM')
        .controller('widgetListController', widgetListController);
    
    function widgetListController($routeParams, widgetService, flickrService, $sce) {

        var model = this;
        model.trustThisContent = trustThisContent;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        model.getWidgetUrlForType = getWidgetUrlForType;
        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;

        function init() {
            model.userId = $routeParams['userId'];
            model.websiteId = $routeParams['websiteId'];
            model.pageId = $routeParams['pageId'];
            widgetService
                .findWidgetsByPageId(model.pageId)
                .then(function(widgets) {
                    model.widgets = widgets.data;
                    console.log(widgets);
                }, function(error){
                    console.log(error);
                });
        }
        init();

        function getWidgetUrlForType(type) {
            return 'views/widget/templates/widget-'+type.toLowerCase()+'.view.client.html';
        }

        function getYouTubeEmbedUrl(youTubeLink) {
            var embedUrl = 'https://www.youtube.com/embed/';
            var youTubeLinkParts = youTubeLink.split('/');
            var id = youTubeLinkParts[youTubeLinkParts.length - 1];
            embedUrl += id;
            console.log(embedUrl);
            return $sce.trustAsResourceUrl(embedUrl);

            //https://www.youtube.com/embed/AM2Ivdi9c4E
        }

        function trustThisContent(html) {
            // diligence to scrub any unsafe content
            return $sce.trustAsHtml(html);
        }

        function searchPhotos(searchTerm) {
            flickrService
                .searchPhotos(searchTerm)
                .then(function(response) {
                    data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                    console.log("photos returned");
                }, function(error){
                    console.log(error);
                });

        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url+="/"+photo.id+"_"+photo.secret+"_b.jpg";
            model.widget.url = url;
            model.widget.width = "100%";

            widgetService
                .updateWidget(model.widget._id,model.widget)
                .then(function (status) {
                    console.log("photo selected");
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + vm.pageId + '/widget');
                }, function (error) {
                    console.log(error);
                });
        }

        $('#wdgt-list').sortable({
            axis:"y",
            start: function(event, ui){
                startIndex=ui.item.index();
            },
            stop: function(event, ui) {
                endIndex=ui.item.index();
                return widgetService.updateOrder(model.pageId, startIndex, endIndex);
            }
        })
    }
})();