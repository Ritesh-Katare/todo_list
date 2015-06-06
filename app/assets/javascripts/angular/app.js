var app = angular.module("todo", ['ngResource','ngRoute','xeditable']);
app.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});
app.config([
    '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider
        .when('/lists',{ templateUrl: '/templates/lists/index.html',controller: 'ListCtr'})
        .when('/lists/:id', {templateUrl: '/templates/lists/show.html',controller: "ListShowCtr"})
        .otherwise({redirectTo: '/lists'});
    }
]);