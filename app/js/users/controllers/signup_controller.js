module.exports = function(app) {
	app.controller('SignupController', ['$scope', '$http', '$location', '$cookies', function($scope, $http, $location, $cookies) {
		$scope.buttonText = 'Create New User';
		$scope.confirmPassword = true;
		$scope.user = {};
		$scope.changePlacesText = 'Or sign in to existing user';

		$scope.changePlacesText = function() {
			$location.path('/signin');
		};

		$scope.passwordMatch = function(user) {
			return user.password === user.confirmation;
		};

		$scope.disableButton = function(user) {
			return($scope.userForm.$invalid && !scope.passwordMatch(user));
		};

		$scope.sendToServer = function(user) {
			$http.post('/api/signin', user) 
				.then(function(res) {
					$cookies.put('eat', res.data.token);
					$scope.getUserName();
					$location('/gymPass'); //?
				}, function(res) {
					console.log(res);
				});
			};
	}]);
};