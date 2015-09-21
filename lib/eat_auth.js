var eat = require('eat');
var GymPass = require(__dirname + '/../models/gympass');
var handleError = require(__dirname + '/handle_errors');

module.exports = function(req, res, next) {
	//grabs token
	var encryptedToken = req.headers.token || (req.body? req.body.token : undefined);
	if(!encryptedToken) {
		return res.status(401).json({msg: 'could not authenticate from eat_auth'});
	};
	//decodes token -- has tower of doom to be event emmitted
	eat.decode(encryptedToken, process.env.APP_SECRET, function(err, token) {
		if (err) return handleError(err, res);

		GymPass.find({_id: token.id}, function(err, user) {
			if(err) return handleError(err, res);
			if(!user)
				return res.status(401).json({msg: 'could not authenticate user from eat_auth'});
			req.user = user;
			next();
		});
	});
};