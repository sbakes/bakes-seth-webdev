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
                .then(function(websites){
                    console.log("found websites");
                    model.websites = websites.data;
                    console.log(websites);
                }, function(error){
                    console.log("error retrieving websites");
                    console.log(error);
                    model.message = "error retrieving websites";
                });
            websiteService
                .findWebsiteById(model.websiteId)
                .then(function(website){
                    model.website = website.data;
                    console.log(model.website);
                    console.log("website found!");
                },function(error){
                    console.log("error finding website");
                });

        }
        init();


        function updateWebsite(website) {
            //websiteService.updateWebsite();
            websiteService
                .updateWebsite(model.websiteId, website)
                .then(function(update){
                    if(update== null){
                        model.error = "Unable to update website";
                    }
                    else {
                        model.message = "Successfully updated website";
                    }
                },function(error){
                    console.log(error);
                    model.error = "Unable to update website";
                });
        }

        function deleteWebsite(websiteId) {
            //websiteService.deleteWebsite(websiteId);
            websiteService
                .deleteWebsite(websiteId)
                .then(function (){
                    $location.url('/user/'+model.userId+'/website');
                },function(error){
                    console.log(error);
                    model.error = "Unable to delete website";
                });
        }
    }
})();