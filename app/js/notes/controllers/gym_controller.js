module.exports = function(app) {
	app.controller('gymPassController', ['$scope', 'Resource', function($scope, Resource) {
		$scope.members = [];
		var gymPassResource = Resource('members');
		$scope.description = 'a gym pass mockup app that tracks a user by their first name, class name or number of punches on a punch pass';

		$scope.getAll = function() {
			gymPassResource.getAll(function(err, data) {
				if(err) return console.log(err);
				$scope.members = data;
			});
		};

		$scope.createMember = function(member) {
			gymPassResource.create(member, function(err, data) {
				if(err) return console.log(err);
				$scope.newMember = null;
				$scope.members.push(data);
			});
		};

		$scope.updateMember = function(member) {
			gymPassResource.update(member, function(err) {
				member.editing = false;
				if(err) return console.log(err);
			});
		};

		$scope.editMember = function(member) {
			member.storeName = member.firstName;
			member.storeClasses = member.classes;
			member.storePunchPass = member.punchPass;
			member.editing = true;
		};

		$scope.cancelUpdate = function(member) {
			member.firstName = member.storeName;
			member.classes = member.storeClasses;
			member.punchPass = member.storePunchPass;
			member.editing = false;
		};

		$scope.deleteMember = function(member) {
			gymPassResource.remove(member, function(err) {
				if(err) return console.log(err);
				$scope.members.splice($scope.members.indexOf(member), 1);
			});
		};
	}]);
};