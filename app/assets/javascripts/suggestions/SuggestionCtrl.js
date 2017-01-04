app.controller('SuggestionCtrl', ['$scope', '$state', 'SuggestionsService', 'suggestion', 'AuthService',
	function($scope, $state, SuggestionsService, suggestion, AuthService) {
		$scope.signedIn = AuthService.isAuthenticated();
		$scope.suggestion = suggestion;
		$scope.notification = ' ';

		$scope.isOwner = function(suggestion) {
			var currentUser = AuthService.currentUser();
			if (!currentUser) {
				return false;
			} else {
				return currentUser.id === suggestion.user_id;
			}
		};

		$scope.addComment = function(suggestion) {
			var comment;

			if (!$scope.commentBody || $scope.commentBody === '') {
				return;
			}

			SuggestionsService.addComment(suggestion, {
				body: $scope.commentBody
			}).then(function(success) {
				comment = success;
				comment.vote_count = 0;
				suggestion.comments.push(comment);

				$scope.commentBody = '';
			});
		}

		$scope.editSuggestion = function() {
			if(!$scope.suggestion.title || $scope.suggestion.title === '') { return; }
			SuggestionsService.update(suggestion).then(function(success) {
				$scope.title = '';
				$scope.body = '';
				$state.go('suggestions', { id: $scope.suggestion.id })
			});
		}

		$scope.deleteSuggestion = function() {
			SuggestionsService.delete(suggestion)
		}

		$scope.$on('logout!', function(events, args){
			$scope.signedIn = false;
		})

		$scope.$on('login!', function(events, args) {
			$scope.signedIn = true;
		});
}]);
