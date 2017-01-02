app.service('AuthService', ['$http', '$state', function($http, $state) {
  this.register = function(user_params) {
    return $http.post('/users.json', user_params).then(function(success) {
      $state.go('home')
    })
  }
}]);
