var GymPass = require(__dirname + '/../models/gympass');
var express = require('express');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handle_errors');


var gymPassRoute = module.exports = exports = express.Router();

gymPassRoute.get('/signin', function(req, res){
	GymPass.find({}, function(err, data) {
		if(err) return handleError(err, res);
		res.json(data);
	});
});

gymPassRoute.post('/signup', jsonParser, function(req, res) {
	var newMember = new GymPass(req.body);
	newMember.save(function(err, data) {
		if (err) handleError(err, data);
		res.json(data);
	});
});

gymPassRoute.put('/gymPass/updateMember/:id', jsonParser, function(req,res) {
	var updateMember = req.body;
	delete updateMember._id;
	GymPass.update({_id: req.params.id}, updateMember, function(err, data) {
		if (err) return handleError(err, res);
		res.send(updateMember);
	});
});

gymPassRoute.delete('/gymPass/deleteMember/:id', function(req, res) {
	GymPass.remove({_id: req.params.id}, function(err) {
		if(err) return handleError(err, res);
		res.json({msg: 'removed user'});
	});
});