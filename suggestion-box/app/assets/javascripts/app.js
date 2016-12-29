var app = angular.module('SuggestionBox', ['ui.router', 'templates']);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'home/_home.html',
        controller: 'HomeCtrl',
        resolve: {
          suggestionsPromise: ['SuggestionsService', function(SuggestionsService) {
            return SuggestionsService.getAll();
          }]
        }
      })
      .state('suggestions', {
        url: '/suggestion/{id}',
        templateUrl: 'suggestions/_suggestion.html',
        controller: 'SuggestionCtrl',
        resolve: {
          suggestion: ['$stateParams', 'SuggestionsService', function($stateParams, SuggestionsService) {
            return SuggestionsService.get($stateParams.id);
          }]
        }
      })
      .state('suggestionEdit', {
        url: '/suggestion/{id}/edit',
        templateUrl: 'suggestions/_edit.html',
        controller: 'SuggestionCtrl',
        resolve: {
          suggestion: ['$stateParams', 'SuggestionsService', function($stateParams, SuggestionsService) {
            return SuggestionsService.get($stateParams.id);
          }]
        }
      })

    $urlRouterProvider.otherwise('home');
}]);
