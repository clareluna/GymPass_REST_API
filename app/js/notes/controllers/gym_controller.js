module.exports = function(app) {
	app.controller('gymPassController', ['$scope', '$http', function($scope, $http) {
		$scope.members = [];

		$scope.getAll = function() {
			$http.get('/api/signin') 
				.then(function(res) {
					$scope.members = res.data;
				}, function(res) {
					console.log(res);
				});
		};

		$scope.createMember = function(member) {
			$http.post('/api/signup', member) 
				.then(function(res) {
					$scope.members.push(res.data);
					$scope.newMember = null;	
				}, function(res) {
					console.log(res);
				});
		};

		$scope.updateMember = function(member) {
			member.status = 'pending';
			$http.put('/api/gymPass/updateMember/' + member._id, member)
				.then(function(res) {
					delete member.status;
					member.editing = false;
				}, function(res) {
					console.log(res);
					member.status = 'failed';
					member.editing = false;
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
			member.status = 'pending';
			$http.delete('/api/gymPass/deleteMember/' + member._id)
				.then(function(res) {
					$scope.members.splice($scope.members.indexOf(member), 1)
				}, function(res) {
					console.log(res);
					member.status = 'failed';
				});
		};
	}])
}