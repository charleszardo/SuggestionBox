app.controller('SuggestionCtrl', ['$scope', '$state', 'SuggestionsService', 'VotingService', 'suggestion',
	function($scope, $state, SuggestionsService, VotingService, suggestion) {
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

		$scope.upVote = function(suggestion) {
			VotingService.vote(suggestion, true);
		};

		$scope.downVote = function(suggestion) {
			VotingService.vote(suggestion, false);
		};

		$scope.editSuggestion = function() {
			if(!$scope.suggestion.title || $scope.suggestion.title === '') { return; }
			SuggestionsService.update(suggestion).then(function(success) {
				$scope.title = '';
				$scope.body = '';
				$state.go('suggestions', { id: $scope.suggestion.id })
			});
		};

		$scope.deleteSuggestion = function() {
			SuggestionsService.delete(suggestion).then(function(success) {
				$state.go('home');
			});
		}
}]);
