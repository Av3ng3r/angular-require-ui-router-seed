define([
    'lib/appRoutes',
    'lib/services/dependencyResolverFor'
], function(config, dependencyResolverFor) {
    var app = angular.module('app', ['lazyOverride']);

    app.config([
        '$routeProvider',
        '$locationProvider',
        '$controllerProvider',
        '$compileProvider',
        '$filterProvider',
        '$provide',

        function($routeProvider, $locationProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {
            app.lazy = {
                controller : $controllerProvider.register,
                directive  : $compileProvider.directive,
                filter     : $filterProvider.register,
                factory    : $provide.factory,
                service    : $provide.service
            };

            $locationProvider.html5Mode(true);

            if(config.routes !== undefined) {
                angular.forEach(config.routes, function(route, path) {
                    $routeProvider.when(path, {
                        templateUrl:route.templateUrl,
                        resolve:dependencyResolverFor(route.module)
                    });
                });
            }

            if(config.defaultRoutePath !== undefined) {
                $routeProvider.otherwise({
                    redirectTo:config.defaultRoutePath
                });
            }
        }
    ]);

   return app;
});
