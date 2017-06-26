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
            .when('/user/:userId/preferences', {
                templateUrl: 'views/user/templates/preferences.html',
                controller: 'websiteListController',
                controllerAs: 'model'
            })
            .when('/user/:userId/pastComments', {
                templateUrl: 'views/user/templates/comments.html',
                controller: 'profileController',
                controllerAs: 'model'
            })
            .when('/user/:userId/sources', {
                templateUrl: 'views/user/templates/sources.html',
                controller: 'websiteListController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website', {
                templateUrl: 'views/website/templates/website-list.view.client.html'
                ,controller: 'websiteListController',
                controllerAs: 'model'
            })
            .when('/user//website', {
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
            });
            // .otherwise({
            //     redirectTo: "/login"
            // });

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