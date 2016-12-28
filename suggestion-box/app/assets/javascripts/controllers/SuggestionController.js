app.controller('SuggestionController', ['$scope', '$stateParams', 'suggestions',
	function($scope, $stateParams, suggestions) {
		$scope.post = suggestions.posts[$stateParams.id];

		$scope.addComment = function(post) {
			if (!$scope.postBody || $scope.postBody === '') {
				return;
			}

			post.comments.push({
				body: $scope.postBody,
				upvotes: 0
			});

			$scope.postBody = '';
		};

		$scope.upVote = function(comment) {
			comment.upvotes += 1;
		};
}]);
