var chai = require('chai');
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
var expect = chai.expect;
process.env.MONGO_URL = 'mongodb://localhost/gymPass_test';
require(__dirname + '/../server');
var mongoose = require('mongoose');
var User = require(__dirname + '/../models/user');
var eatAuth = require(__dirname + '/../lib/eat_auth');
var httpBasic = require(__dirname + '/../lib/http_basic');

describe ('httpBasic', function() {
	it('should be able to parse http basic auth data', function() {
		var req = {
			headers: {
				authorization: 'Basic ' + (new Buffer('test:dexter')).toString('base64') // user = test pass = dexter
			}
		};

		httpBasic(req, {}, function() {
			expect(typeof req.auth).to.eql('object');
			expect(req.auth.username).to.eql('test');
			expect(req.auth.password).to.eql('dexter');
		});
	});
});

describe('auth', function() {
	after(function(done) {
    	mongoose.connection.db.dropDatabase(function() {
			done();
		});
	});
	it('should be able to create a new member', function() {
		chai.request('localhost:3000/api')
			.post('/signup')
			.send({username: 'tester', password: 'tucker'})
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res.body.token).to.have.length.above(0);
				done();
			});
	});
});

describe('should be able to find member already in database', function() {
	before(function(done) {
		var member = new User();
		member.username = 'test';
		member.basic.username = 'test';
		member.generateHash('dexter', function(err, res) {
			if (err) return err;
			member.save(function(err, data) {
				if(err) return err;
				member.generateToken(function(err, token) {
					this.token = token;
					done();
				}.bind(this));
			}.bind(this));
		}.bind(this));
	});

	it('should be able to sign in', function(done) {
		chai.request('localhost:3000/api')
			.get('/signin')
			.auth('test', 'dexter')
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res.body.token).to.have.length.above(0);
				done();	
			});
	});

	it('should be able to athenticate with eat', function() {
		var token = this.token;
		var req = {
			headers: {
				token: token
			}
		};

		eatAuth(req, {}, function(done) {
			expect(req.member.username).to.eql('test');
			done();
		});
	});
});