var app = angular.module('myApp', ['ngRoute', 'ngMaterial']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: '/views/templates/home.html',
            controller: 'HomeController',
            controllerAs: 'hc'
        })
        .when('/searchdish', {
            templateUrl: '/views/templates/searchdish.html',
            controller: 'SearchController',
            controllerAs: 'sd'
        })
        .when('/adddish', {
            templateUrl: '/views/templates/adddish.html',
            controller: 'AdddishController',
            controllerAs: 'ad'
        })
        // .when('/infopopup', {
        //     templateUrl: '/views/templates/popups/infopopup.html',
        //     controller: 'AdddishController',
        //     controllerAs: 'ad'
        // })
        .otherwise({
            redirectTo: '/home'
        });
}]);
