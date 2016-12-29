app.directive('voting', ['VotingService', function(VotingService) {
    return {
        templateUrl : 'voting/_voting.html',
        link: function($scope, element, attrs) {
            $scope.upVote = function(suggestion) {
              VotingService.vote(suggestion, true);
            },
            $scope.downVote = function(suggestion) {
              VotingService.vote(suggestion, false)
            }
        }
    };
}]);
