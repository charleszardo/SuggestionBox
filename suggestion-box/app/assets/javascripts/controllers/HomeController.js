app.controller('HomeController', ['$scope', 'suggestions', function($scope, suggestions) {
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
		suggestion.upvotes += 1;
	};

	$scope.getSuggestionIndex = function(suggestion) {
		return $scope.suggestions.indexOf(suggestion);
	};
}]);
