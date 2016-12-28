var app = angular.module('SuggestionBox', ['ui.router', 'templates']);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: '/home.html',
        controller: 'HomeController'
      })
      .state('suggestions', {
        url: '/suggestion/{id}',
        templateUrl: '/suggestion.html',
        controller: 'SuggestionController'
      })

    $urlRouterProvider.otherwise('home');
}]);
