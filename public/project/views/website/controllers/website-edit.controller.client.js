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
                    console.log("website ID" + model.websiteId);
                    model.website = website.data;
                    console.log(model.website);
                    console.log("website found!");
                },function(error){
                    console.log("error finding website");
                });

        }
        init();


        function updateWebsite(name, description) {

            if (name === undefined) {
                console.log("no name found");
                model.error = 'Website must have a name';
                return;
            };

            //websiteService.updateWebsite();
            console.log("---------------------------");
            var website = {
                _id: model.websiteId,
                name: name,
                description: description,
                developerId: model.userId

            };
            console.log(website);
            websiteService
                .updateWebsite(model.websiteId, website)
                .then(function(update){
                    if(update === null){
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
                .then(function (success){
                    console.log(success);
                    $location.url('/user/'+model.userId+'/website');
                    console.log('deleted website');
                },function(error){
                    console.log(error);
                    model.error = "Unable to delete website";
                    console.log("unable to delete website");
                });
        }
    }
})();