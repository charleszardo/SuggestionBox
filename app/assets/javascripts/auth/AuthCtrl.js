app.controller('AuthCtrl', ['$scope', 'AuthService', function($scope, AuthService) {
  $scope.register = function () {
    var user_params = {
      user: {
        username: $scope.username,
        password: $scope.password
      }
    }

    return AuthService.register(user_params);
  };
}]);
