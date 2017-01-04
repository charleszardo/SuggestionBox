var app = angular.module('SuggestionBox', ['ui.router', 'templates', 'ngCookies', 'ngMdIcons']);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$httpProvider',
  function($stateProvider, $urlRouterProvider, $httpProvider) {

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
      .state('register', {
        url: '/register',
        templateUrl: 'auth/_register.html',
        controller: 'AuthCtrl',
        resolve: {
          isAuthenticated: ['$q', 'AuthService', function($q, AuthService) {
            var deferred = $q.defer();
            deferred.resolve(AuthService.isAuthenticated());
            return deferred.promise;
          }]
        },
        onEnter: ['$state', 'isAuthenticated', function($state, isAuthenticated) {
          if (isAuthenticated) {
            $state.go('home');
          }
        }]
      })
      .state('login', {
        url: '/login',
        templateUrl: 'auth/_login.html',
        controller: 'AuthCtrl',
        resolve: {
          isAuthenticated: ['$q', 'AuthService', function($q, AuthService) {
            var deferred = $q.defer();
            deferred.resolve(AuthService.isAuthenticated());
            return deferred.promise;
          }]
        },
        onEnter: ['$state', 'isAuthenticated', function($state, isAuthenticated) {
          if (isAuthenticated) {
            $state.go('home');
          }
        }]
      });

    $urlRouterProvider.otherwise('home');

    $httpProvider.interceptors.push("AuthInterceptor");
}]);
