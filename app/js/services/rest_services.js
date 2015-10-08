var handleSuccess = function(callback) {
	return function(res) {
		callback(null, res.data);
	};
};

var handleError = function(callback) {
	return function(data) {
		callback(data);
	};
};

module.exports = function(app) {
	app.factory('Resource', ['$http', function($http) {
		var Resource = function(resourceName) {
			this.resourceName = resourceName;
		};

		Resource.prototype.create = function(member, callback) {
			$http.post('/api/signup', member)
				.then(handleSuccess(callback), handleError(callback));
		};

		Resource.prototype.getAll = function(callback) {
			$http.get('/api/signin')
				.then(handleSuccess(callback), handleError(callback));
		};

		Resource.prototype.update = function(member, callback) {
			$http.put('/api/gymPass/updateMember/' + member._id, member) 
				.then(handleSuccess(callback), handleError(callback));
		};

		Resource.prototype.remove = function(member, callback) {
			$http.delete('/api/gymPass/deleteMember/' + member._id) 
				.then(handleSuccess(callback), handleError(callback));
		};

		return function(resourceName) {
			return new Resource(resourceName);
		};
	}]);
};