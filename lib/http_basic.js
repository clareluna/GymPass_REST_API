module.exports = function(req, res, next) {
	var userPassEncoded = (req.headers.authorization || ' :').split(' ')[1]; //split username from password
	var userPassBuf = new Buffer(userPassEncoded, 'base64'); //buffer password in base64
	var userPassSplit = userPassBuf.toString('utf8').split(':');
	req.auth = {
		username: userPassSplit[0],
		password: userPassSplit[1]
	};

	if(!(req.auth.username.length && req.auth.password.length)) {
		console.log('could not authenticate: ' + req.auth.username);
		return res.status(401).send({msg: 'could not authenticate from http_basic'});
	}

	next();

};