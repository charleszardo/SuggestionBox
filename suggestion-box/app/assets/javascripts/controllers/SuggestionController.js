app.controller('SuggestionController', ['$scope', 'suggestions', 'suggestion',
	function($scope, suggestions, suggestion) {
		$scope.suggestion = suggestion;

		$scope.addComment = function(suggestion) {
			if (!$scope.postBody || $scope.postBody === '') {
				return;
			}

			suggestion.comments.push({
				body: $scope.postBody,
				upvotes: 0
			});

			$scope.postBody = '';
		};

		$scope.upVote = function(comment) {
			comment.upvotes += 1;
		};
}]);
