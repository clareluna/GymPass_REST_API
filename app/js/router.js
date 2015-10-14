module.exports = function(gymPassApp) {
	gymPassApp.config(['$routeProvider', function($route) {
		$route
			.when('/gymPass/updateMember', {
				templateUrl: '/templates/members/member_form_template.html'
			})
			.when('/signup', {
				templateUrl: '/templates/members/views/signupin_view.html',
				controller: 'SignupController'
			})
			.when('/signin', {
				templateUrl: '/templates/members/views/signupin_view.html',
				controller: 'SigninController'
			})
			.otherwise({
				redirectTo: '/signup'
			});
	}]);
};