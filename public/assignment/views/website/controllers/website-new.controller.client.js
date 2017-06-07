(function () {
    angular
        .module('WAM')
        .controller('websiteNewController', websiteNewController);
    
    function websiteNewController($routeParams,
                                  websiteService,
                                  $location) {

        var model = this;
        model.userId = $routeParams['userId'];


        // event handlers
        model.createWebsite = createWebsite;


        //model.websites = websites;

        function init() {
            //websites = websiteService.findAllWebsitesForUser(model.userId);
            //model.website = websiteService.findWebsiteById(model.websiteId);
            websiteService
                .findAllWebsitesForUser(userId)
                .success(function(websites){
                    model.websites = websites;
                });
        }
        init();

        // implementation
        function createWebsite(website) {
            website.developerId = model.userId;

            websiteService
                .createWebsite(website)
                .success(function(){
                    model.message = "Successfully created website";
                    $location.url('/user/'+model.userId+'/website');
                })
                .error(function(){
                    model.error = "Unable to create website"
                });
            //websiteService.createWebsite(website);
            console.log("website created successful")
        }
    }
})();