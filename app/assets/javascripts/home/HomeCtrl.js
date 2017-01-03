app.controller('HomeCtrl', ['$scope', 'SuggestionsService', 'AuthService', function($scope, SuggestionsService, AuthService) {
	$scope.signedIn = AuthService.isAuthenticated();
	$scope.suggestions = SuggestionsService.suggestions;

	$scope.addSuggestion = function () {
		if(!$scope.title || $scope.title === '') { return; }
		SuggestionsService.create({
			title: $scope.title,
			body: $scope.body
		})

		$scope.title = '';
		$scope.body = '';
	}

	$scope.getSuggestionIndex = function(suggestion) {
		return $scope.suggestions.indexOf(suggestion);
	}

	$scope.$on('logout!', function(events, args){
		$scope.signedIn = false;
	})

	$scope.$on('login!', function(events, args) {
		$scope.signedIn = true;
	});
}]);
