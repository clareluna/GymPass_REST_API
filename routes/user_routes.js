var express = require('express');
var User = require(__dirname + '/../models/user');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handle_errors');
var httpBasic = require(__dirname + '/../lib/http_basic');
var EventEmitter = require('events').EventEmitter;
var ee = new EventEmitter();

var userRouter = modules.exports = exports = express.Router();

userRouter.get('/signin', httpBasic, function(req, res){
	User.findOne({'basic.username': req.auth.username}, function(err, user) {
		if(err) return handleError(err, res);
		if(!user) {
			console.log('could not authenticate issue here: ' + req.auth.username);
			return res.status(401).json({msg: 'could not authenticate username'});
		}
		ee.emit('compareHashRoute', req, res, user);
	});
});		

ee.on('compareHashRoute', function(req, res, user) {		
	user.compareHash(req.auth.password, function(err, hashReq) {
		if(err) return handleError(err, res);
		if(!hashReq) {
			console.log('could not authenticate: ' + req.auth.username);
			return res.status(401).json({msg: 'could not authenticate'});
		}
		ee.emit('generateTokenRoute', req, res, user);
	});	
});

ee.on('generateTokenRoute', function(req, res, user) {
	user.generateToken(function(err, token) {
		if (err) return handleError(err, res);
		return res.json({token: token});	
	});
});

userRouter.post('/signup', jsonParser, function(req, res) {
	newMember = new User();
	newMember.basic.username = req.body.username;
	newMember.username = req.body.username;
	ee.emit('generateHash', newMember, req, res);
});	

ee.on('generateHash', function(req, res, newMemeber) {		
	newMember.generateHash(req.body.password, function(err, hash) {
		if (err) return handleError(err, res); //set up EE to begin once the next finishes
		ee.emit('save', newMember, req, res);
	});
});

ee.on('save', function(newMember, req, res) {
	newMember.save(function(err, data) {
		if(err) return handleError(err, data);
		ee.emit('generateToken', newMember, req, res);
	});	
});		

ee.on('generateToken', function(newMemeber, req, res) {
	newMember.generateToken(function(err, token) {
		if(err) return handleError(err, res);
		res.json({token: token});
	});
});
