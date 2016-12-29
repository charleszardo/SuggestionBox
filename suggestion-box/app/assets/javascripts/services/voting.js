app.factory('voting', ['$http', function($http) {
	var o = {};

	o.vote = function(suggestion, val) {
		var params = {
			upvote: val
		}
		return $http.post('/suggestions/' + suggestion.id + '/votes.json', params).then(function(success) {
			suggestion.vote_count += (val === true ? 1 : -1)
		})
	}

	return o;
}]);
