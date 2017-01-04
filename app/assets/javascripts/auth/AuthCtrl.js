app.controller('AuthCtrl', ['$scope', '$state', 'AuthService', function($scope, $state, AuthService) {
  $scope.errors = [];

  $scope.register = function () {
    var user_params = {
      user: {
        username: $scope.username,
        password: $scope.password
      }
    }

    AuthService.register(user_params)
               .then(function(success){
                 $state.go('home');
               }, function(errors) {
                 $scope.errors = [];
                 $scope.errors = errors;
               })
  }

  $scope.login = function () {
    var user_params = {
      user: {
        username: $scope.username,
        password: $scope.password
      }
    }

    AuthService.login(user_params)
               .then(function(success){
                 $state.go('home');
               }, function(errors) {
                 $scope.errors = [];
                 $scope.errors = errors;
               });
  }
}]);
