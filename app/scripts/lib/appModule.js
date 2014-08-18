define([
    'lib/appRoutes',
    'lib/services/dependencyResolverFor'
], function(config, dependencyResolverFor) {
    app = angular.module('app', ['lazyOverride']);

    app.config([
        '$stateProvider',
        '$urlRouterProvider',
        '$locationProvider',
        '$controllerProvider',
        '$compileProvider',
        '$filterProvider',
        '$provide',

        function($stateProvider, $urlRouterProvider, $locationProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {
            app.lazy = {
                controller : $controllerProvider.register,
                directive  : $compileProvider.directive,
                filter     : $filterProvider.register,
                factory    : $provide.factory,
                service    : $provide.service
            };

            $locationProvider.html5Mode(true);

            if(config.routes !== undefined) {
                angular.forEach(config.routes, function(route, state) {
                    $stateProvider.state(state, {
                        url: route.url,
                        templateUrl: route.templateUrl,
                        resolve: dependencyResolverFor(route.module),
                        controller: route.controller
                    });
                });
            }

            if(config.defaultRoutePath !== undefined) {
                $urlRouterProvider.otherwise(config.defaultRoutePath);
            }
        }
    ]);

   return app;
});
