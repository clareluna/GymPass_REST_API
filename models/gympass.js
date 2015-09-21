var mongoose = require('mongoose');

var gymPassSchema = new mongoose.Schema({
	firstName: String,
	classes: String,
	punchPass: { type: Number,
		min: 0,
		max: 10
	}
});

module.exports = mongoose.model('GymPass', gymPassSchema);