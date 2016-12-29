app.controller('HomeController', ['$scope', 'suggestions', 'voting', function($scope, suggestions, voting) {
	$scope.suggestions = suggestions.suggestions;

	$scope.addSuggestion = function () {
		if(!$scope.title || $scope.title === '') { return; }
		suggestions.create({
			title: $scope.title,
			body: $scope.body,
			upvotes: 0,
			comments: []
		})

		$scope.title = '';
	};

	$scope.upVote = function(suggestion) {
		voting.vote(suggestion, true);
	};

	$scope.downVote = function(suggestion) {
		voting.vote(suggestion, false);
	};

	$scope.getSuggestionIndex = function(suggestion) {
		return $scope.suggestions.indexOf(suggestion);
	};
}]);
