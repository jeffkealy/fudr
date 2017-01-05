var app = angular.module('myApp', ['ngRoute', 'ngMaterial', 'firebase', 'ngTouch', 'xeditable']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: '/views/templates/home.html'
        })
        .when('/searchdish', {
            templateUrl: '/views/templates/searchdish.html',
            controller: 'SearchController',
            //resolve: to check their level.  search: $routeProvider, resolve
            controllerAs: 'sd'
        })
        .when('/adddish', {
            templateUrl: '/views/templates/adddish.html',
            controller: 'AdddishController',
            controllerAs: 'ad'
        })
        .otherwise({
            redirectTo: '/home'
        });
}]);
