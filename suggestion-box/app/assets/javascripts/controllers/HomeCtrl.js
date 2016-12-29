app.controller('HomeCtrl', ['$scope', 'SuggestionsService', 'VotingService', function($scope, SuggestionsService, VotingService) {
	$scope.suggestions = SuggestionsService.suggestions;
	$scope.addSuggestion = function () {
		if(!$scope.title || $scope.title === '') { return; }
		SuggestionsService.create({
			title: $scope.title,
			body: $scope.body
		})

		$scope.title = '';
	};

	$scope.upVote = function(suggestion) {
		VotingService.vote(suggestion, true);
	};

	$scope.downVote = function(suggestion) {
		VotingService.vote(suggestion, false);
	};

	$scope.getSuggestionIndex = function(suggestion) {
		return $scope.suggestions.indexOf(suggestion);
	};
}]);
