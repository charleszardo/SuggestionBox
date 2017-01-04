app.controller('AuthCtrl', ['$scope', 'AuthService', function($scope, AuthService) {
  $scope.errors = [];

  $scope.register = function () {
    var user_params = {
      user: {
        username: $scope.username,
        password: $scope.password
      }
    }

    AuthService.register(user_params).then(function(errors){
      $scope.errors = [];

      if (errors) {
        $scope.errors = errors;
      }
    });
  }

  $scope.login = function () {
    var user_params = {
      user: {
        username: $scope.username,
        password: $scope.password
      }
    }

    return AuthService.login(user_params);
  }
}]);
