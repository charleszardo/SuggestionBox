app.controller('SuggestionCtrl', ['$scope', '$state', 'SuggestionsService', 'suggestion',
	function($scope, $state, SuggestionsService, suggestion) {
		$scope.suggestion = suggestion;
		$scope.notification = ' '

		$scope.addComment = function(suggestion) {
			if (!$scope.commentBody || $scope.commentBody === '') {
				return;
			}

			SuggestionsService.addComment(suggestion, {
				body: $scope.commentBody
			}).then(function(success) {
				suggestion.comments.push({
					body: success.body,
					upvotes: 0
				});
			})
			// suggestion.comments.push({
			// 	body: $scope.postBody,
			// 	upvotes: 0
			// });
			//
			// $scope.postBody = '';
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
			SuggestionsService.delete(suggestion)
		}
}]);
