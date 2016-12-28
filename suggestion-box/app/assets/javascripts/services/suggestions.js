app.factory('suggestions', ['$http', function($http) {
	var demoSuggestions = {
		posts: [
			{
				title: 'Suggestion 1',
				upvotes: 10,
				comments: []
			},
			{
				title: 'Suggestion 2',
				upvotes: 2,
				comments: []
			},
			{
				title: 'Suggestion 3',
				upvotes: 27,
				comments: []
			},
			{
				title: 'Suggestion 4',
				upvotes: 19,
				comments: []
			},
			{
				title: 'Suggestion 5',
				upvotes: 1,
				comments: []
			},
			{
				title: 'Suggestion 6',
				upvotes: 8,
				comments: []
			},
		]
	}

	var o = {};
	o.suggestions = [];

	o.getAll = function () {
		return $http.get('/suggestions.json').then(function(success) {
			angular.copy(success.data, o.suggestions);
		});
	};

	o.create = function(suggestion) {
		return $http.post('/suggestions.json', suggestion).then(function(success){
			o.suggestions.push(success.data);
		});
	};

	return o;
}]);
