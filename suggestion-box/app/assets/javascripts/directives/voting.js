app.directive('voting', ['VotingService', function(VotingService) {
    return {
        templateUrl : 'voting/_voting.html',
        scope: {
          item: "="
        },
        link: function($scope, element, attrs) {
            $scope.upVote = function() {
              VotingService.vote($scope.item, true);
            },
            $scope.downVote = function() {
              VotingService.vote($scope.item, false)
            }
        }
    };
}]);
