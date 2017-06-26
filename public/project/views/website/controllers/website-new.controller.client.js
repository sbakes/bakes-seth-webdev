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
        }
        init();

        // implementation
        function createWebsite(name, description) {
            console.log(model.websites.length);
            n = new Date().getTime(); //so every website has a unique id

            console.log("name: " + name);

            if (name === undefined) {
                console.log("no name found");
                model.error = 'Website must have a name';
                return;
            };

            var websiteNew = {
                name: name,
                description: description,
                developerId: model.userId,
                _id: model.userId + n
            };
            //website.developerId = model.userId;

            websiteService
                .createWebsite(model.userId, websiteNew)
                .then(function(success){
                    model.message = "Successfully created website";
                    console.log(success);
                    $location.url('/user/'+model.userId+'/website');
                },function(error){
                    model.error = "Unable to create website";
                    console.log(error);
                });
            //websiteService.createWebsite(website);
        }
    }
})();