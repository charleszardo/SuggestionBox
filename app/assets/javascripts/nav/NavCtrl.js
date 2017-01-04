app.controller('NavCtrl', ['$scope', '$state', 'AuthService', function($scope, $state, AuthService) {
  $scope.signedIn = AuthService.isAuthenticated();
  $scope.$state = $state;
  $scope.user = AuthService.currentUser();

  $scope.logout = function () {
    AuthService.logout();
    $state.go('home');
  }

  $scope.$on('logout!', function(events, args){
    $scope.user = { username: ''};
    $scope.signedIn = false;
  });

  $scope.$on('login!', function(events, args) {
    $scope.user = AuthService.currentUser();
    $scope.signedIn = true;
  });
}]);
