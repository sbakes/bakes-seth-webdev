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
                controllerAs: 'model'
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
            .when('/user/:userId/website/:websiteId/page/pageId', {
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
            .when('/user/:userId/website/:websiteId/page/:pageId/widget/image-editor', {
                templateUrl: 'views/widget/editors/widget-image-editor.view.client.html',
                controller: 'widgetListController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website/:websiteId/page/:pageId/widget/youtube-editor', {
                templateUrl: 'views/widget/editors/widget-youtube-editor.view.client.html',
                controller: 'widgetListController',
                controllerAs: 'model'
            })
            .when('/user/:userId/website/:websiteId/page/:pageId/widget/header-editor', {
                templateUrl: 'views/widget/editors/widget-heading-editor.view.client.html',
                controller: 'widgetListController',
                controllerAs: 'model'
            })
    }
})();