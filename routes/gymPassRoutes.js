var GymPass = require(__dirname + '/../models/gympass');
var express = require('express');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handle_errors');


var gymPassRoute = module.exports = exports = express.Router();

gymPassRoute.get('/gymPass', function(req, res){
	GymPass.find({}, function(err, data) {
		if(err) return handleError(err, res);
		res.json(data);
	});
});

gymPassRoute.post('/gymPass', jsonParser, function(req, res) {
	var newMember = new GymPass(req.body);
	newMember.save(function(err, data) {
		if (err) handleError(err, data);
		res.json(data);
	});
});

gymPassRoute.put('/gymPass/:id', jsonParser, function(req,res) {
	var updateMember = req.body;
	delete updateMember._id;
	GymPass.update({_id: req.params.id}, updateMember, function(err, data) {
		if (err) return handleError(err, res);
		res.send(updateMember);
	});
});

