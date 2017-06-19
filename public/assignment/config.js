(function () {
    angular
        .module('WAM')
        .config(configuration);
    
    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home.html'
            })
            .when('/login', {
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'loginController',
                controllerAs: 'vm'
            })
            .when('/register', {
                templateUrl: 'views/user/templates/register.html',
                controller: 'registerController',
                controllerAs: 'model'
            })
            .when('/profile', {
                templateUrl: 'views/user/templates/profile.html',
                controller: 'profileController',
                controllerAs: 'model',
                resolve: { loggedin: checkLoggedIn }
            })
            .when('/user/:userId', {
                templateUrl: 'views/user/templates/profile.html',
                controller: 'profileController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website', {
                templateUrl: 'views/website/templates/website-list.view.client.html'
                ,controller: 'websiteListController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website/new', {
                templateUrl: 'views/website/templates/website-new.view.client.html',
                controller: 'websiteNewController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website/:websiteId', {
                templateUrl: 'views/website/templates/website-edit.view.client.html',
                controller: 'websiteEditController',
                controllerAs: 'model'
            })
            // page routing
            .when('/user/:userId/website/:websiteId/page', {
                templateUrl: 'views/page/templates/page-list.view.client.html',
                controller: 'pageListController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website/:websiteId/page/new', {
                templateUrl: 'views/page/templates/page-new.view.client.html',
                controller: 'pageNewController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website/:websiteId/page/:pageId', {
                templateUrl: 'views/page/templates/page-edit.view.client.html',
                controller: 'pageEditController',
                controllerAs: 'model'
            })
            // widget routing
            .when('/user/:userId/website/:websiteId/page/:pageId/widget', {
                templateUrl: 'views/widget/templates/widget-list.view.client.html',
                controller: 'widgetListController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website/:websiteId/page/:pageId/widget/new', {
                templateUrl: 'views/widget/templates/widget-choose.view.client.html',
                controller: 'widgetListController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website/:websiteId/page/:pageId/widget/edit', {
                templateUrl: 'views/widget/templates/widget-heading.view.client.html',
                controller: 'widgetListController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website/:websiteId/page/:pageId/widget/youtube', {
                templateUrl: 'views/widget/templates/widget-youtube.view.client.html',
                controller: 'widgetListController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website/:websiteId/page/:pageId/widget/image', {
                templateUrl: 'views/widget/templates/widget-image.view.client.html',
                controller: 'widgetListController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website/:websiteId/page/:pageId/widget/image-new', {
                templateUrl: 'views/widget/editors/widget-image-new.view.client.html',
                controller: 'widgetNewController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website/:websiteId/page/:pageId/widget/youtube-new', {
                templateUrl: 'views/widget/editors/widget-youtube-new.view.client.html',
                controller: 'widgetNewController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website/:websiteId/page/:pageId/widget/html-new', {
                templateUrl: 'views/widget/editors/widget-html-new.html',
                controller: 'widgetNewController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website/:websiteId/page/:pageId/widget/html-edit', {
                templateUrl: 'views/widget/editors/widget-html-edit.html',
                controller: 'widgetEditController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website/:websiteId/page/:pageId/widget/heading-new', {
                templateUrl: 'views/widget/editors/widget-heading-new.view.client.html',
                controller: 'widgetNewController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website/:websiteId/page/:pageId/widget/text-new', {
                templateUrl: 'views/widget/editors/widget-text-new.view.client.html',
                controller: 'widgetNewController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website/:websiteId/page/:pageId/widget/text-edit', {
                templateUrl: 'views/widget/editors/widget-text-editor.view.client.html',
                controller: 'widgetEditController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId', {
                templateUrl: 'views/widget/templates/widget-edit.view.client.html',
                controller: 'widgetEditController',
                controllerAs: 'model'
            })
            .when("/user/:id/website/:websiteId/page/:pageId/widget/:widgetId/flickr", {
                templateUrl: "views/widget/templates/widget-flickr-search.view.client.html",
                controller: "flickrController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/login"
            });

        function checkLoggedIn(userService, $q, $location, $rootScope) {
            var deferred = $q.defer();
            userService
                .checkLoggedIn()
                .then(
                    function (response) {
                        var user = response.data;
                        if (user === '0') {
                            deferred.reject();
                            $rootScope.currentUser = null;
                            $location = "#!/login";
                        } else {
                            $rootScope.currentUser = user;
                            deferred.resolve();
                        }
                    },
                    function (error) {
                        $rootScope.currentUser = null;
                        deferred.reject();
                    }
                );
            return deferred.promise;
        }
    }
})();