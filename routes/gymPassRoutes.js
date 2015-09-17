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

gymPassRoute.put('/gymPass/:update', jsonParser, function(req,res) {
	var updateMember = req.body;
	delete updateMember._update;
	GymPass.update({_update: req.params.update}, updateMember, function(err, data) {
		if (err) return handleError(err, res);
		res.json({msg: "a sucessful update took place"});
	});
});

gymPassRoute.delete('/gymPass/:deleteData', function(req, res) {
	GymPass.remove({_deleteData: req.params.deleteData}, function(err) {
		if (err) return handleError(err, res);
		res.json({msg: "sucessfully removed " + _deleteData});
	});
});

// gymPassRoute.get('/classes', function(req, res) {
// 	GymPass.static('find classes', function(name, callback) {
// 		return.this.find({classes: name}, callback);
// 	});
// });// needs work

//include modifications of punchpass