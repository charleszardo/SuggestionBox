app.service('AuthService', ['$http', '$q', '$rootScope', '$state', 'AuthToken', 'AuthEvents',
  function($http, $q, $rootScope, $state, AuthToken, AuthEvents) {

  this.register = function(user_params) {
    var that = this;
    return $http.post('/users.json', user_params).then(function(success) {
      var user = user_params.user;

      that.login(user.username, user.password);
    }).then(function() {
      // $state.go('home');
    });
  };

  this.login = function(username, password) {
    var d = $q.defer();

    $http.post('/authenticate', { username: username, password: password })
         .then(function(success) {
           var resp = success.data;
           AuthToken.setToken(resp.auth_token);
           $rootScope.$broadcast(AuthEvents.loginSuccess);
           d.resolve(resp.user);
         }, function(error) {
           var resp = success.data;
           $rootScope.$broadcast(AuthEvents.loginFailed);
           d.reject(resp.error);
         });

    return d.promise;
  };
}]);
