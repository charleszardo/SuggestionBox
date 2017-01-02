app.controller('AuthCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
  $scope.register = function () {
    var user_params = {
      user: {
        username: $scope.username,
        password: $scope.password
      }
    }
    console.log($scope)
    return $http.post('/users.json', user_params).then(function(success) {
      $state.go('home')
    })
  };
}]);
