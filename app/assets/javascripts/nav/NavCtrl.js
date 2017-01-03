app.controller('NavCtrl', ['$scope', 'AuthService', function($scope, AuthService) {
  $scope.signedIn = AuthService.isAuthenticated();
  $scope.logout = AuthService.logout;

  $scope.user = AuthService.currentUser();

  $scope.$on('logout!', function(events, args){
    $scope.user = { username: ''}
    $scope.signedIn = false;
  })

  $scope.$on('login!', function(events, args) {
    $scope.user = AuthService.currentUser();
    $scope.signedIn = true;
  });

  // $scope.$on('devise:new-registration', function(e, user) {
  //   $scope.user = user;
  // });
  //
  // $scope.$on('devise:login', function(e, user) {
  //   $scope.user = user;
  // });
  //
  // $scope.$on('devise:logout', function(e, user) {
  //   $scope.user = {};
  // });
}]);
