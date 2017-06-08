(function () {
    angular
        .module('WAM')
        .directive('wbdvSortable', wbdvSortable);

    function wbdvSortable() {
        function linker(scope, element, attributes) {
            console.log("sorting widgets");
            $(element).sortable({
                axis: 'y',
                start:function (event,ui) {
                    startIndex = ui.item.index();
                },
                stop: function(event,ui) {
                    endIndex = ui.item.index();
                    widgetService.updateOrder(vm.pageId,startIndex,endIndex);
                }});
        }
        return {
            link: linker
        };
    }
})();