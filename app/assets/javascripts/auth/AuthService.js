app.service('AuthService', ['$http', '$q', '$rootScope', '$state', '$cookieStore', 'AuthToken', 'AuthEvents',
  function($http, $q, $rootScope, $state, $cookieStore, AuthToken, AuthEvents) {

  this.register = function(user_params) {
    var that = this;
    return $http.post('/users.json', user_params).then(function(success) {
      that.login(user_params);
    })
  }

  this.login = function(user_params) {
    var user = user_params.user,
           d = $q.defer();

    $http.post('/authenticate', user)
         .then(function(success) {
           var resp = success.data;
           $cookieStore.put('suggestionUser', resp.user);
           AuthToken.setToken(resp.auth_token);
           $rootScope.$broadcast(AuthEvents.loginSuccess);
           $rootScope.$broadcast('login!');
           d.resolve(resp.user);
         }, function(error) {
           var resp = error.data;
           $rootScope.$broadcast(AuthEvents.loginFailed);
           d.reject(resp.error);
         })
         .then(function() {
           $state.go('home');
         });

    return d.promise;
  }

  this.currentUser = function() {
    return $cookieStore.get('suggestionUser');
  }

  this.isAuthenticated = function() {
    return !!AuthToken.getToken();
  }

  this.logout = function () {
    $rootScope.$broadcast('logout!', 'xyz');
    AuthToken.destroyToken();
    $cookieStore.remove('suggestionUser');
    $state.go('home');
  }
}]);
