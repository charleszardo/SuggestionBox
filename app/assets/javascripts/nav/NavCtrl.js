app.controller('NavCtrl', ['$scope', '$state', 'AuthService', function($scope, $state, AuthService) {
  $scope.signedIn = AuthService.isAuthenticated();
  $scope.logout = AuthService.logout;
  $scope.$state = $state;

  $scope.user = AuthService.currentUser();

  $scope.$on('logout!', function(events, args){
    $scope.user = { username: ''};
    $scope.signedIn = false;
  })

  $scope.$on('login!', function(events, args) {
    $scope.user = AuthService.currentUser();
    $scope.signedIn = true;
  });
}]);
