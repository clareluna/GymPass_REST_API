'use strict';

var chai = require('chai');
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
var expect = chai.expect;
var mongoose = require('mongoose');
process.env.MONGO_URL = 'mongodb://localhost/gymPass_test';
require(__dirname + '/../server');
var url = 'localhost:3000/api';
var GymPass = require('./../models/gympass');

describe('the gym membership resource', function() {
	after(function(done) {
		mongoose.connection.db.dropDatabase(function(err) {
			if (err) throw err;
			done();
		});
	});

	it('should be able to get first name', function(done) {
		chai.request(url)
			.get('/gymPass')
			.end(function(err, res){
				expect(err).to.eql(null);
				expect(Array.isArray(res.body)).to.eql(true); // need to find a way to /first name to get this to eql true
				done();
		});
	});

	it('should be able to get a class section', function(done) {
		chai.request(url)
			.get('/gymPass')//should these be the key values
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(Array.isArray(res.body)).to.eql(true);
				done();
		});
	});
	it('should be able to create a gym member', function(done) {
		chai.request(url)
			.post('/gymPass')
			.send({
				firstName: 'Dexter',
				classes: 'tennis ball fetching',
				punchPass: 7
			})
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res.body.firstName).to.eql('Dexter');
				expect(res.body.classes).to.eql('tennis ball fetching');
				expect(res.body.punchPass).to.eql(7);
				done();
			});
	});
});

describe('deducting punches or adding classes', function() {
	beforeEach(function(done) {
		var testTucker = new GymPass({
			firstName: 'Tucker',
			classes: 'annoying Dexter',
			punchPass: 5
			});
		testTucker.save(function(err, data) {
			if(err) return err;
			this.testTucker = data;
			console.log(data);
			done();
		}.bind(this));
	});

	it('should be able to deduct a punch per class the user attends', function(err, res) {
		chai.request(url)
		.put('/gymPass/' + this.testTucker._id)
		.send({
			firstName: 'Dexter',
			classes: 'tennis ball fetching',
			punchPass: 4
		})
		.end(function(err, res) {
			expect(err).to.eql(null);
			expect(res.body.punchPass).to.eql(4); //coming back undefinded
			done();
		});
	});
});




