module.exports = function(app) {
	app.directive('memberForm', function() {
		return{
			restrict: 'AC',
			replace: true,
			templateUrl: '/templates/members/member_form_template.html',
			transclude: true,
			scope:{
				labelText: '@',
				buttonText: '@', // sets to directives isolated scope
				firstName: '=', // creates a two way binding that will make these editable
				classes: '=',
				punchPass: '=',
				save: '&', //passing to the parent scope
			},
			controller: function($scope) {
			console.log($scope.save);
			}	
		}
	});
};