(function () {
    angular
        .module('WAM')
        .controller('pageListController', pageListController);

    function pageListController($location, pageService, userService, $routeParams, $scope, websiteService) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.createPage = createPage;
        model.canDelete = canDelete;
        model.deletePage = deletePage;

        function init() {
            //model.page = pageService.findPageByCredentials(model.websiteId);
            //console.log(model.userId);
            //console.log(model.websiteId);
            //console.log(model.website);
            //console.log($scope.news);
            pageService
                .findAllPagesForWebsite(model.websiteId)
                .then(function(pages){
                    model.pages = pages.data;
                    //console.log(pages);
                    console.log("Successfully gathered pages");
                },function(error){
                    console.log(error);
                    model.error = "No comments for this article";
                });

            userService
                .findUserById(model.userId)
                .then(function(success){
                    //console.log(success);
                    model.user = success.data.username;
                    model.userPrivilage = success.data.admin;
                }, function(error){
                    console.log(error);
                });

            websiteService
                .findWebsiteById(model.websiteId)
                .then(function(success){
                    model.website = success.data;
                }, function(error){
                    model.error = "Unable to find host website";
                })

        }
        init();

        function canDelete(commentAuthor){
            //var adminString = model.userPrivilage;
            //console.log(adminString);
            if(model.userPrivilage[0] === "TRUE"){
                console.log("triggered");
                return true;
            } else if (commentAuthor === model.user) {
                console.log("triggered");
                return true;
            } else {
                return false;
            }
        }

        // implementation
        function createPage(pageDescription) {

            console.log(pageDescription);

            if (pageDescription === undefined) {
                //console.log("no name found");
                model.error = 'Comment cannot be empty';
                return;
            };

            n = new Date().getTime(); //so every page has a unique id

            var pageNew = {
                name: model.userId+n,
                description: pageDescription,
                developerId: model.userId,
                author: model.user,
                websiteId: model.websiteId,
                _id: model.websiteId+n
            };
            //console.log(pageNew);
            pageService
                .createPage(model.websiteId, pageNew)
                .then(function (success) {
                    model.message = "Successfully created comment";
                    //console.log(success);
                    //console.log(model.userId);
                    //console.log(model.websiteId);
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
                    init();
                    ///user/:userId/website/:websiteId/page/pageId
                },function (error) {
                    model.error = "Unable to create comment";
                });

            //pageService.createPage(page);
        }

        function deletePage(pageId) {
            //pageService.deletePage(pageId);
            //$location.url('/user/'+model.userId+'/page');
            pageService
                .deletePage(pageId)
                .then(function(){
                    model.message = "Successfully deleted comment";
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
                }, function(){
                    model.error = "Unable to delete comment";
                });
            init();
        }
    }
})();