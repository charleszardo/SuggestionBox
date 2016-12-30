app.service('SuggestionsService', ['$http', function($http) {
	this.suggestions = [];

	this.getAll = function () {
		var that = this;

		return $http.get('/suggestions.json').then(function(success) {
			angular.copy(success.data, that.suggestions);
		});
	};

	this.get = function (id) {
		return $http.get('/suggestions/' + id + '.json').then(function(success) {
			return success.data;
		});
	};

	this.create = function(suggestion) {
		var that = this;

		return $http.post('/suggestions.json', suggestion).then(function(success){
			success.data.vote_count = 0;
			success.data.comments = [];
			that.suggestions.push(success.data);
		});
	};

	this.update = function(suggestion) {
		return $http.put('/suggestions/'+ suggestion.id + '.json', suggestion).then(function(success) {
			return success.data;
		});
	};

	this.delete = function(suggestion) {
		return $http.delete('/suggestions/' + suggestion.id + '.json').then(function(success) {
			return success.data;
		});
	};

	this.addComment = function(suggestion, comment) {
		return $http.post('/suggestions/' + suggestion.id + '/comments.json', comment).then(function(success) {
			return success.data;
		}, function(error) {
			console.log(error);
		});
	};
}]);
