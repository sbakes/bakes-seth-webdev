(function () {
    angular
        .module('WAM')
        .controller('websiteListController', websiteListController);
    
    function websiteListController($routeParams, websiteService) {

        var model = this;
        model.userId = $routeParams['userId'];
        //model.websites = websites;

        function init() {
            console.log(model.userId);
            websiteService
                .findAllWebsitesForUser(model.userId)
                .then(function(websites){
                    console.log("found websites");
                    model.websites = websites.data;
                    console.log(websites);
                }, function(error){
                    console.log("error retrieving websites");
                    console.log(error);
                    model.message = "error retrieving websites";
                });
                //websites = websiteService.findAllWebsitesForUser(model.userId);

            console.log(model.websites);
        }
        init();

    }
})();