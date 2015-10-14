var express = require('express');
var User = require(__dirname + '/../models/user');
var jsonParser = require('body-parser');
var handleErrors = require(__dirname + '/../lib/handle_errors');
var httpBasic = require(__dirname + '/../lib/http_basic');
var eat = require(__dirname + '/../lib/eat_auth');

var UserRouter = module.exports = exports = express.Router();

UserRouter.post('/signup', jsonParser, function(req, res) { 
	var newUser = new User();
	newUser.basic.username = req.body.username;
	newUser.username = req.body.username;
	newUser.generateHash(req.body.password, function(err, hash) {
		if(err) return handleError(err, res);
		newUser.save(function(err, data) {
			if (err) return handleError(err, res);
			newUser.generateToken(function(err, res) {
				if(err) return handleError(err, res);
				res.json({token: token});
			});
		});
	});
});

UserRouter.get('/signin', httpBasic, function(req, res) {
	User.findOne({'basic.username': req.auth.username}, function(err, res) {
		if(err) return handleError(err, res);

		if(!user) {
			console.log('Could not authenticate');
			return res.status(401).json({msg: 'authenticate did not work'});
		}

		user.compareHash(req.auth.password, function(err, hashRes) { 
			if(err) return handleError(err, res);
			if(!hashRes) {
				console.log('could not authenticate');
				return res.status(401).json({msg: 'compare hash failed to authenticate'});
			}

			user.generateToken(function(err, token) {
				if(err) return handleError(err, res);
				res.json({token: token});
			});
		});
	});
});

UserRouter.get('/username', jsonParser, eat, function(req, res) {
	res.json({username: req.user.username});
});