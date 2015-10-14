module.exports = function(app) {
	app.controller('SigninController', ['$scope', '$http', '$base64', '$location', '$cookies', function($scope, $http, $base64, $location, $cookies) {
		$scope.buttonType = 'Kenny Logs In';
		$scope.user = {};
		$scope.changePlacesText = 'Or create new user'; // redirect to signup

		$scope.changePlacesText = function() {
			return $location.path('/signup');
		};

		$scope.sendToServer = function(user) {
			$http({
				method: 'GET',
				url: '/api/signin',
				headers: {
					'Authorization': 'Basic ' + $base64.encode(user.username + ': ' + user.password) 
				}
			})
			.then(function(res) {
				$cookies.put('eat', res.data.token);
				$scope.getUserName(); // find this function
				$location.path('/gymPass/updateMember/'); // :id?
			}, function(res) {
				console.log(res);
			});
		};
	}]);
};