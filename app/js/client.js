require('angular/angular');

var gymPassApp = angular.module('gymPassApp', []);

gymPassApp.controller('gymPassController', ['$scope', function($scope) {
	$scope.greeting = 'your name here';
}]);