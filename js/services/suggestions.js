app.factory('suggestions', [function() {
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
	
	return demoSuggestions;
}]);