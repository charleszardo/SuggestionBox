app.factory('VotingService', ['$http', function($http) {
	var o = {};

	o.vote = function(obj, val) {
		// TODO improve way of determing if obj is suggestion or comment
		var resource = obj.title ? '/suggestions/' : '/comments/',
				params = { upvote: val}
				
		return $http.post(resource + obj.id + '/votes.json', params).then(function(success) {
			obj.vote_count += (val === true ? 1 : -1)
		})
	}

	return o;
}]);
