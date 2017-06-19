(function(){
    angular
        .module("WAM")
        .controller("widgetEditController", widgetEditController);

    function widgetEditController($routeParams, $location, widgetService) {
        var model = this;
        model.getEditorTemplateUrl = getEditorTemplateUrl;
        model.updateWidget = updateWidget;
        model.deleteWidget = deleteWidget;

        function init() {
            model.userId = $routeParams['userId'];
            model.websiteId = $routeParams['websiteId'];
            model.pageId = $routeParams['pageId'];
            model.widgetId = $routeParams['widgetId'];

            widgetService
                .findWidgetsByPageId(model.pageId)
                .then(function (widgets) {
                    console.log(widgets);
                    model.widgets = widgets.data;
                });
            widgetService
                .findWidgetById(model.widgetId)
                .then(function (widget) {
                    model.widget = widget.data;
                    console.log(model.widget);
                    model.widget.operation = "edit";
                }, function(error) {
                    console.log(error);
                });
        }
        init();

        function getEditorTemplateUrl(type) {
            return 'views/widget/templates/editors/widget-'+type+'-editor.view.client.html';
        }

        function updateWidget(name, size, url, text) {

            if (name === undefined) {
                console.log("no name found");
                model.error = 'Widget must have text';
                return;
            };
            var widgetUpdate = model.widget;
            widgetUpdate.name = name;
            widgetUpdate.size = size;
            widgetUpdate.url = url;
            widgetUpdate.text = text;

            console.log(widgetUpdate);

            widgetService
                .updateWidget(model.widgetId, widgetUpdate)
                .then(function (update) {
                    if(update == null){
                        console.log(update);
                        model.error = "update unsuccessful";
                    }else{
                        console.log(update);
                        model.message = "update successful";
                        init();
                    }
                }, function (error) {
                    console.log(error);
                    model.error ="update unsuccessful";
                });

        }

        function deleteWidget(){
            var widgetId = model.widgetId;
            widgetService
                .deleteWidget(widgetId)
                .then(function () {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget');
                }, function (error) {
                    console.log(error);
                    model.error = "widget update unsuccessful";
                });
        }
    }
})();