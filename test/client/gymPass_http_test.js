require(__dirname + '/../../app/js/client');
require('angular-mocks');

describe('gymPass controller', function() {
  var $httpBackend;
  var $ControllerConstructor;
  var $scope;

	beforeEach(angular.mock.module('gymPassApp'));

  	beforeEach(angular.mock.inject(function($rootScope, $controller) {
   		$scope = $rootScope.$new();
    	$ControllerConstructor = $controller;
  	}));

	it('should be able to create a controller', function() {
		var controller = new $ControllerConstructor('gymPassController', {$scope: $scope}) 
		expect(typeof $scope).toBe('object');
		expect(typeof controller).toBe('object');
		expect(Array.isArray($scope.members)).toBe(true);
	});

	describe('REST requests', function() {
		beforeEach(angular.mock.inject(function(_$httpBackend_, $rootScope) {
			$httpBackend = _$httpBackend_;
			$scope = $rootScope.$new();
			$ControllerConstructor('gymPassController', {$scope: $scope});
		}));

		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
      		$httpBackend.verifyNoOutstandingRequest();
		});

		it('should be able to make a get request when getAll() is called', function() {
			$httpBackend.expectGET('/api/signin').respond(200, [{firstName: 'test user', classes: 'coding', punchPass: 5}]);
			$scope.getAll();
			$httpBackend.flush();
			expect($scope.members[0].firstName).toBe('test user');
			expect($scope.members[0].classes).toBe('coding');
			expect($scope.members[0].punchPass).toBe(5);
		});
		
		it('should be able to create a new member', function() {
			$httpBackend.expectPOST('/api/signup', {firstName:'tester', classes:'testing', punchPass: 10}).respond(200, {_id: 1, firstName:'response test', classes: 'res classes', punchPass:9});
			$scope.newMember = {firstName: 'Clare', classes: 'napping', punchPass: 2};
			$scope.createMember({firstName:'tester', classes:'testing', punchPass: 10});
			$httpBackend.flush();
			expect($scope.members[0].firstName).toBe('response test');
			expect($scope.members[0].classes).toBe('res classes');
			expect($scope.members[0].punchPass).toBe(9);
			expect($scope.newMember).toBe(null);
		});
	
		it('should be able to update a member', function() {
			$scope.members[0] = {_id: 7, firstName: 'test member', classes: 'updating files', punchPass:8, status: 'pending', editing:'true'};
			$httpBackend.expectPUT('/api/gymPass/updateMember/' + $scope.members[0]._id).respond(200);
			$scope.updateMember($scope.members[0]);
			$httpBackend.flush();
			expect($scope.members[0].editing).toBe(false);
		});

		it('should be ablee to delete a member', function() {
			$scope.members[0] = {_id: 8, firstName:'deleter', classes:'deleting', punchPass:1, status:'pending', editing: true};
			$httpBackend.expectDELETE('/api/gymPass/deleteMember/' + $scope.members[0]._id).respond(200);
			$scope.deleteMember($scope.members[0]);
			$httpBackend.flush();
			expect($scope.members[0]).toBe(undefined);
		});
	});
});