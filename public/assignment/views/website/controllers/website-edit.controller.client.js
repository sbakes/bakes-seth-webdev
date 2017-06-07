(function () {
    angular
        .module('WAM')
        .controller('websiteEditController', websiteEditController);
    
    function websiteEditController($routeParams, websiteService, $location) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];

        // event handlers
        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        function init() {
            //websites = websiteService.findAllWebsitesForUser(model.userId);
            //model.website = websiteService.findWebsiteById(model.websiteId);
            websiteService
                .findAllWebsitesForUser(model.userId)
                .success(function(websites) {
                    model.websites = websites;
                });
            websiteService
                .findWebsiteById(model.websiteId)
                .success(function(website){
                    model.website = website;
                });

        }
        init();


        function updateWebsite(website) {
            //websiteService.updateWebsite();
            websiteService
                .updateWebsite(model.websiteId, website)
                .success(function(update){
                    if(update== null){
                        model.error = "Unable to update website";
                    }
                    else {
                        model.message = "Successfully updated website";
                    }
                })
                .error(function(){
                    model.error = "Unable to update website";
                });
        }

        function deleteWebsite(websiteId) {
            //websiteService.deleteWebsite(websiteId);
            websiteService
                .deleteWebsite(websiteId)
                .success(function (){
                    $location.url('/user/'+model.userId+'/website');
                })
                .error(function(){
                    model.erro = "Unable to delete website";
                });
        }
    }
})();