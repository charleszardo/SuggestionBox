app.controller('HomeCtrl', ['$scope', 'SuggestionsService', function($scope, SuggestionsService) {
	$scope.suggestions = SuggestionsService.suggestions;
	$scope.addSuggestion = function () {
		if(!$scope.title || $scope.title === '') { return; }
		SuggestionsService.create({
			title: $scope.title,
			body: $scope.body
		})

		$scope.title = '';
	};

	$scope.getSuggestionIndex = function(suggestion) {
		return $scope.suggestions.indexOf(suggestion);
	};
}]);
