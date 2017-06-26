(function () {
    angular
        .module("myDirectives", [])
        .directive("widgetSortable", widgetSortable);
    
    function widgetSortable() {
        function linker(scope, element, attributes) {
            var data = scope.data;
            var startIndex = -1;
            var endIndex = -1;
            $(element)
                .find("span")
                .sortable({
                    start: function (event, ui) {
                        console.log("sorting began");
                        startIndex = ui.item.index();
                        console.log(startIndex);
                    },
                    stop: function (event, ui) {
                        endIndex = ui.item.index();
                        
                        var sortedElement = scope.data.splice(startIndex, 1)[0];
                        scope.data.splice(endIndex, 0, sortedElement);
                        scope.$apply();
                        scope.reorder({start: startIndex, end: endIndex});
                    }
                });
        }
        return {
            templateUrl: "widget-list.view.client.html",
            scope: {
                title: '=',
                border: '=',
                data: '=',
                reorder: '&sorted'
            },
            link: linker
        }
    }
})();