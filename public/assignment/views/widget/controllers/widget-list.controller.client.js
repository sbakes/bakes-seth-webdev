(function () {
    angular
        .module('WAM')
        .controller('widgetListController', widgetListController);
    
    function widgetListController($sce) {

        var model = this;
        model.trustThisContent = trustThisContent;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        model.getWidgetUrlForType = getWidgetUrlForType;

        function init() {
            model.userId = $routeParams['userId'];
            model.websiteId = $routeParams['websiteId'];
            model.pageId = $routeParams['pageId'];
            widgetService
                .findAllWidgetsForPage(model.pageId)
                .success(function(widgets) {
                    model.widgets = widgets;
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
    }
})();