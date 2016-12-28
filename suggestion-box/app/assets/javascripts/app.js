var app = angular.module('SuggestionBox', ['ui.router', 'templates']);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'home/_home.html',
        controller: 'HomeController',
        resolve: {
          suggestionsPromise: ['suggestions', function(suggestions) {
            return suggestions.getAll();
          }]
        }
      })
      .state('suggestions', {
        url: '/suggestion/{id}',
        templateUrl: 'suggestions/_suggestion.html',
        controller: 'SuggestionController',
        resolve: {
          suggestion: ['$stateParams', 'suggestions', function($stateParams, suggestions) {
            return suggestions.get($stateParams.id);
          }]
        }
      })

    $urlRouterProvider.otherwise('home');
}]);
