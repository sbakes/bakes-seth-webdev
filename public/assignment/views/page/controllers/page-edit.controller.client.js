(function () {
    angular
        .module('WAM')
        .controller('pageEditController', pageEditController);

    function pageEditController($location, pageService, $routeParams) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];

        //model.page = pageService.findPageById(pageId);

        // event handlers
        model.updatePage = updatePage;
        model.deletePage = deletePage;

        function init() {
            //model.page = pageService.findPageById(model.pageId);
            pageService
                .findAllPagesForWebsite(model.websiteId)
                .then(function(pages){
                    model.pages = pages.data;
                    console.log(pages);
                    console.log("Successfully gathered pages");
                },function(error){
                    console.log(error);
                    model.message = "error retrieving pages";
                });
            pageService
                .findPageById(model.pageId)
                .then(function(page){
                    console.log(page);
                    model.page = page.data;
                    console.log(model.page.name);
                    console.log(model.page.description);
                }, function(error){
                    console.log(error);
                });
        }
        init();


        function updatePage(name, description) {
            //pageService.updatePage();

            var Newpage = {
                _id: model.pageId,
                websiteId: model.websiteId,
                userId: model.userId,
                name: name,
                description: description,
                developerId: model.userId
            };
            pageService
                .updatePage(model.pageId, Newpage)
                .then(function(success){
                    //console.log(success);
                    model.message = "Successfully update page";
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
                    $
                }, function(error){
                    //console.log(error);
                    model.alert = "Unable to update page";
                });
        }

        function deletePage(pageId) {
            //pageService.deletePage(pageId);
            //$location.url('/user/'+model.userId+'/page');
            pageService
                .deletePage(pageId)
                .then(function(){
                    model.message = "Successfully deleted page";
                    $location.url('/user/'+model.userId+'/website/'+model.websiteId+'/page');
                }, function(){
                    model.error = "Unable to delete page";
                });
        }
    }
})();