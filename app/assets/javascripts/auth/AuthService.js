app.service('AuthService', ['$http', '$q', '$rootScope', '$cookieStore', 'AuthToken', 'AuthEvents',
  function($http, $q, $rootScope, $cookieStore, AuthToken, AuthEvents) {

  this.register = function(user_params) {
    var that = this,
           d = $q.defer();

    $http.post('/users.json', user_params)
         .then(function(success) {
           that.login(user_params);
           d.resolve(success.data);
         }, function(error) {
           d.reject(error.data.errors);
         });

    return d.promise;
  }

  this.login = function(user_params) {
    var user = user_params.user,
           d = $q.defer(),
        data;

    $http.post('/authenticate', user)
         .then(function(success) {
           data = success.data;
           $cookieStore.put('suggestionUser', data.user);
           AuthToken.setToken(data.auth_token);
           $rootScope.$broadcast('login!');
           d.resolve(data.user);
         }, function(error) {
           d.reject(error.data.errors);
         });

    return d.promise;
  }

  this.currentUser = function() {
    // debugger
    return $cookieStore.get('suggestionUser');
  }

  this.isAuthenticated = function() {
    return !!AuthToken.getToken();
  }

  this.logout = function () {
    $rootScope.$broadcast('logout!');
    AuthToken.destroyToken();
    $cookieStore.remove('suggestionUser');
  }
}]);
