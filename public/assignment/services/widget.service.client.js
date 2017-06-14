(function () {
    angular
        .module('WAM')
        .factory('widgetService', widgetService);

    function widgetService($http) {

        return {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget,
            //updateOrder: updateOrder,
            //photoSearch: photoSearch,
            //uploadImage: uploadImage
        };

        function createWidget(pageId, widget) {
            var url = "/api/page/"+pageId+"/widget";
            console.log(url);
            return $http.post(url, widget);
        }

        function findWidgetsByPageId(pageId) {
            var url = "/api/page/"+pageId+"/widget";
            console.log(url);
            return $http.get(url);
        }

        function updateWidget(widgetId, widget) {
            var url = "/api/widget/"+widgetId;
            console.log(url);
            return $http.put(url, widget);
        }

        function deleteWidget(widgetId) {
            var url = "/api/widget/"+widgetId;
            console.log(url);
            return $http.delete(url);
        }

        function findWidgetById(widgetId) {
            var url = "/api/widget/"+widgetId;
            console.log(url);
            return $http.get(url);
        }


    }
})();