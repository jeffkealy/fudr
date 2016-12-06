var app = angular.module('myApp', ['ngRoute', 'ngMaterial']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: '/views/templates/home.html',
            controller: 'HomeController',
            controllerAs: 'hc'
        })
        .when('/geocode', {
            templateUrl: '/views/templates/home.html',
            controller: 'GeocodeController',
            controllerAs: 'GC'
        })
        .otherwise({
            redirectTo: '/home'
        });
}]);
