app.controller('SuggestionController', ['$scope', 'suggestions', 'suggestion',
	function($scope, suggestions, suggestion) {
		$scope.suggestion = suggestion;
		$scope.notification = ' '

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

		$scope.editSuggestion = function() {
			if(!$scope.suggestion.title || $scope.suggestion.title === '') { return; }
			suggestions.update(suggestion).then(function(success) {
				$scope.notification = "Suggestion Updated!"

				$scope.title = '';
				$scope.body = '';
			})
		}
}]);
