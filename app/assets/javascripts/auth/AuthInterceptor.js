app.factory("AuthInterceptor", ['$q', '$injector', '$window', 'AuthToken', function($q, $injector, $window, AuthToken) {
  return {
    request: function(config) {
      var token = AuthToken.getToken();

      config.headers = config.headers || {};

      if (token) {
        config.headers.Authorization = "Bearer " + token;
      }
      return config || $q.when(config);
    },
    responseError: function(response) {
      var AuthEvents = $injector.get('AuthEvents'),
          matchesAuthenticatePath = response.config && response.config.url.match(new RegExp('/api/auth'));

      if (!matchesAuthenticatePath) {
        $injector.get('$rootScope').$broadcast({
          401: AuthEvents.notAuthenticated,
          403: AuthEvents.notAuthorized,
          419: AuthEvents.sessionTimeout
        }[response.status], response);
      }
      return $q.reject(response);
    }
  };
}]);

// $rootScope.$on(AuthEvents.notAuthorized, function() {
//   // ... Take some action in response to a 401
// });
