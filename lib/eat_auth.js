var eat = require('eat');
var User = require(__dirname + '/../models/user');
var handleError = require(__dirname + '/handle_errors');
var EventEmitter = require('events').EventEmitter;
var ee = new EventEmitter();


module.exports = function(req, res, next) {

	var encryptedToken = req.headers.token || (req.body? req.body.token : undefined);
	if(!encryptedToken) {
		return res.status(401).json({msg: 'could not authenticate from eat_auth'});
		ee.emit('decode', encryptedToken, req, res, next);	
	};

	ee.on('decode', function(encryptedToken, req, res, next) {
		eat.decode(encryptedToken, process.env.APP_SECRET, function(err, token) {
			if (err) return handleError(err, res);
			ee.emit('findOne', encryptedToken, req, res, next, token);	
		});		
	});

	ee.on('findOne', function(err, token) {	
		if(err) return handleError(err, res);
		User.findOne({_id: token.id}, function(err, user) {
			if(err) return handleError(err, res);
			req.user = user;
			next();
		});	
	});
};














