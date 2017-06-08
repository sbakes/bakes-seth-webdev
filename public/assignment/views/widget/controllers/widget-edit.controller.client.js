(function(){
    angular
        .module("WAM")
        .controller("widgetEditController", widgetEditController);

    function widgetEditController($routeParams, $location, widgetService) {
        var vm = this;
        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init() {
            vm.userId = $routeParams['userId'];
            vm.websiteId = $routeParams['websiteId'];
            vm.pageId = $routeParams['pageId'];
            vm.widgetId = $routeParams['widgetId'];

            widgetService
                .findAllWidgetsForPage(vm.pageId)
                .success(function (widgets) {
                    vm.widgets = widgets;
                });
            widgetService
                .findWidgetById(vm.widgetId)
                .success(function (widget) {
                    vm.widget = widget;
                    vm.widget.operation = "edit";
                })
        }
        init();

        function getEditorTemplateUrl(type) {
            return 'views/widget/templates/editors/widget-'+type+'-editor.view.client.html';
        }

        function updateWidget(widgetId,widget){
            widgetService
                .updateWidget(widgetId, widget)
                .success(function (update) {
                    if(update == null){
                        vm.error = "update unsuccessful";
                    }else{
                        vm.message = "update successful";
                        init();
                    }
                })
                .error(function () {
                    vm.error ="update unsuccessful";
                })
        }

        function deleteWidget(widgetId){
            widgetService
                .deleteWidget(widgetId)
                .success(function () {
                    $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/' + vm.pageId + '/widget');
                })
                .error(function () {
                    vm.error = "widget update unsuccessful";
                });
        }
    }
})();