require('../../app/js/client'); //pulls all controller, directive and services in

describe('rest services', function() {
	beforeEach(angular.mock.module('gymPassApp'));

	var RESTService;
	var $httpBackend;
	var gymPassResource;

	beforeEach(angular.mock.inject(function(Resource, _$httpBackend_) {
		RESTService = Resource;
		$httpBackend = _$httpBackend_;
		gymPassResource = RESTService('members'); //passing members array into REST Service constructor
	}));

	afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();		
	});

	it('should be able to make get requests', function() {
		$httpBackend.expectGET('/api/signin').respond(200, [{firstName: 'testTucker', classes: 'barking', punchPass: 5}]);
		gymPassResource.getAll(function(err, data) {
			expect(err).toBe(null);
			expect(Array.isArray(data)).toBe(true);
		});
		$httpBackend.flush();
	});

	it('should be able to make post requests', function() {
		var testTucker= {
			_id: 1,
			firstName: 'testTucker',
			classes: 'people watching',
			punchPass: 6
		};	
		$httpBackend.expectPOST('/api/signup', testTucker).respond(200, {_id:4, firstName:'dexterDog', classes: 'neighborhood watch', punchPass: 5});
		gymPassResource.create(testTucker, function(err, data) {
			expect(err).toBe(null);
			expect(data.firstName).toBe('dexterDog');
			expect(data.classes).toBe('neighborhood watch');
			expect(data.punchPass).toBe(5);
		});
		$httpBackend.flush();
	});	

	it('should be able to edit a member', function() {
		var testTucker= {
			_id: 55,
			firstName: 'testTucker',
			classes: 'digging holes',
			punchPass: 10
		};
		$httpBackend.expectPUT('/api/gymPass/updateMember/' + testTucker._id, testTucker).respond(200);
		gymPassResource.update(testTucker, function(err) {
			expect(err).toBe(null);
		});
		$httpBackend.flush();
	});

	it('should be able to delete a member', function() {
		var noGoodCat = {
			_id: 666,
			firstName: 'Sylvester',
			classes: 'clawing faces',
			punchPass: 1
		};
		$httpBackend.expectDELETE('/api/gymPass/deleteMember/' + noGoodCat._id).respond(200);
		gymPassResource.remove(noGoodCat, function(err) {
			expect(err).toBe(null);
		});
		$httpBackend.flush();
	});
});