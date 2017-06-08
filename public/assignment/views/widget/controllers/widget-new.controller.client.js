(function(){
    angular
        .module("WAM")
        .controller("widgetNewController", widgetNewController);

    function widgetNewController($routeParams, $location, widgetService) {
        var vm = this;
        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.createWidget = createWidget;

        function init(){
            vm.userId = $routeParams['userId'];
            vm.websiteId = $routeParams['websiteId'];
            vm.pageId = $routeParams['pageId'];
            vm.widgetId = $routeParams['widgetId'];
            vm.widgetType = $routeParams['widgetType'];

            widgetService
                .findAllWidgetsForPage(vm.pageId)
                .success(function (widgets) {
                    vm.widgets = widgets;
                    vm.widget.operation = "new";
                })
        }
        init();

        function getEditorTemplateUrl(type) {
            return 'views/widget/templates/editors/widget-'+type+'-editor.view.client.html';
        }

        function createWidget(pid,widget) {
            widgetService
                .createWidget(pid,widget,vm.widgetType)
                .success(function (newWidget) {
                    if(newWidget == null){
                        vm.error = "widget not added";
                    }else{
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                        init();
                    }
                })
                .error(function () {
                    vm.error = "widget not created";
                })
        }
    }
})();