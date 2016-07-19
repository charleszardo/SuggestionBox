app.controller('SuggestionController', ['$scope', '$routeParams', 'suggestions', 
	function($scope, $routeParams, suggestions) {
		$scope.post = suggestions.posts[$routeParams.id];
		
		$scope.addComment = function(post) {
			if (!$scope.postBody || $scope.postBody === '') {
				return;
			}
			
			post.comments.push({
				body: $scope.postBody,
				upvotes: 0
			});
		};
		
		$scope.upVote = function(comment) {
			comment.upVotes += 1;
		};
}]);