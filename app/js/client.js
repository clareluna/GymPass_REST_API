require('angular/angular');

var gymPassApp = angular.module('gymPassApp', []);

gymPassApp.controller('gymPassController', ['$scope', function($scope) {
	$scope.greeting = 'welcome to gym pass';
}]);