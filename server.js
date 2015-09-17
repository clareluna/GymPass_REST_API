var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/gymPass_dev');//database will be named gymPass_dev
var gymPassRouter = require(__dirname + '/routes/gymPassRoutes');
app.use('/api', gymPassRouter);
var port = process.env.PORT || 3000;

app.listen(port, function(){
	console.log('server listening on port: ' + port);
});
//middleware will allow for validation

//apply a min and max validation numbers. Gym punch card. Username, class, classes on punch card 0-10

//also need a non crud (random) run-- signin?