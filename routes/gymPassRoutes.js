var GymPass = require(__dirname + '/../models/gympass');
var express = require('express');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handle_errors');
var httpBasic = require(__dirname + '/../lib/http_basic'); //where requiring in crypt 


var gymPassRoute = module.exports = exports = express.Router();

gymPassRoute.get('/signin', function(req, res){
	GymPass.findOne({'basic.username': req.auth.username}, function(err, user) {
		if(err) return handleError(err, res);
		
		if(!user) {
			console.log('could not authenticate issue here: ' + req.auth.username);
			return res.status(401).json({msg: 'could not authenticate username'}):
		}
		
		user.compareHash(req.auth.password, function(err, hashReq) {
			if(err) return handleError(err, res);
			if(!hashReq) {
				console.log('could not authenticate: ' + req.auth.username);
				return res.status(401).json({msg: 'could not authenticate'});
			}
				user.generateToken(function(err, token) {
					if (err) return handleError(err, res);
					return res.json({token: token});
			});
		});	
	});
});

gymPassRoute.post('/signup', jsonParser, function(req, res) {
	var newMember = new GymPass();
	newMemeber.basic.username = req.body.username;
	newMember.username = req.body.username;
	newMember.generateHash(req.body.password, function(err, hash) {
		if (err) return handleError(err, res); //set up EE to begin once the next finishes
		newMember.save(function(err, data) {
			if(err) return handleError(err, data);
			newUser.generateToken(function(err, token) {
				if(err) return handleError(err, res);
				res.json({token: token});
			});
		});
	});
});

//needs work still

// gymPassRoute.put('/gymPass/:id', jsonParser, function(req,res) {
// 	var updateMember = req.body;
// 	delete updateMember._id;
// 	GymPass.update({_id: req.params.id}, updateMember, function(err, data) {
// 		if (err) return handleError(err, res);
// 		res.send(updateMember);
// 	});
// });

