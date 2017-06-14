(function () {
    angular
        .module('WAM')
        .controller('widgetNewController', widgetNewController);

    function widgetNewController($routeParams, widgetService, $location) {
        var model = this;

        model.addWidget = addWidget;
        model.addWidgetText = addWidgetText;

        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];

        function addWidget(text, size, url, type) {
            var newWidget = {
                pageId: model.pageId,
                text: text,
                size: size,
                url: url,
                widgetType: type,
                name: ''
            };

            console.log(newWidget);
            switch (type) {
                case 'HEADING':
                    newWidget.widgetType = 'HEADING';
                    //newWidget.size = 1;
                    break;
                case 'IMAGE':
                    newWidget.widgetType = 'IMAGE';
                    newWidget.width = '100%';
                    //newWidget.url = 'http://lorempixel.com/400/200/';
                    break;
                case 'YOUTUBE':
                    newWidget.widgetType = 'YOUTUBE';
                    newWidget.width = '100%';
                    //newWidget.url = 'https://youtu.be/dQw4w9WgXcQ';
                    break;
                // case 'TEXT':
                //     newWidget.widgetType = 'TEXT';
                //     newWidget.rows = size,
                //     newWidget.placeholder = url,
                //     newWidget.formatted = formatted;
                //     break;
                case 'HTML':
                    newWidget.widgetType = 'HTML';
                default:
                    model.alert = "Invalid widget type";
            }

            widgetService
                .createWidget(model.pageId, newWidget)
                .then(
                    function (success) {
                        var id = success.data._id;
                        $location.url('#!/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + id);
                    },
                    function (error) {
                        model.alert = error.data;
                    }
                )
        }

        function addWidgetText(text, rows, placeholder, type, formatted) {
            var newWidget = {
                pageId: model.pageId,
                text: text,
                rows: rows,
                placeholder: placeholder,
                widgetType: 'TEXT',
                formatted: formatted
            };
            widgetService
                .createWidget(model.pageId, newWidget)
                .then(
                    function (success) {
                        var id = success.data._id;
                        $location.url('#!/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + id);
                    },
                    function (error) {
                        model.alert = error.data;
                    }
                )
        }





    }
}());