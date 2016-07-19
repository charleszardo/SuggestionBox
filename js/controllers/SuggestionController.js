app.controller('SuggestionController', ['$scope', '$routeParams', 'suggestions', 
	function($scope, $routeParams, suggestions) {
		$scope.post = suggestions.posts[$routeParams.id];
		
		$scope.addComment = function(post, body) {
				post.comments.push({
				body: body,
				upvotes: 0
			});
		};
		
		$scope.upVote = function(comment) {
			comment.upVotes += 1;
		};
}]);