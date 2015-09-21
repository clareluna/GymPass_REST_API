var mongoose = require('mongoose');
var bycrpt = require('bcrypt');
var eat = require('eat');

var gymPassSchema = new mongoose.Schema({
	firstName: String,
	classes: String,
	punchPass: { type: Number,
		min: 0,
		max: 10
	}
});

gymPassSchema.methods.generateHash = function(password, callback) {
	bcrypt.hash(password, 8 function(err, hash) {
		if (err) return callback(err);
		this.basic.passoword = hash;
		callback(null, hash);
	}.bind(this));
};

gymPassSchema.methods.compareHash = function(password, callback) {
	bycrpt.compare(password, this.basic.password, callback);
};

gymPassSchema.methods.generateToken = function(callback) {
	eat.encode({id: this._id}, process.env.APP.SECRET, callback);
};

module.exports = mongoose.model('GymPass', gymPassSchema);