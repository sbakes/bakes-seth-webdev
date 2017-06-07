(function () {
    angular
        .module('WAM')
        .controller('websiteListController', websiteListController);
    
    function websiteListController($routeParams, websiteService) {

        var model = this;
        model.userId = $routeParams['userId'];
        //model.websites = websites;

        function init() {
            websiteService
                .findAllWebsitesForUser(model.userId)
                .success(function(websites){
                    model.websites = websites;
                });
                //websites = websiteService.findAllWebsitesForUser(model.userId);
        }
        init();
    }
})();