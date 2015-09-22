var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/gymPass_dev');//database will be named gymPass_dev
process.env.APP_SECRET = process.env.APP_SECRET || 
var gymPassRouter = require(__dirname + '/routes/gymPassRoutes');
app.use('/api', gymPassRouter);

var port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log('server listening on port: ' + port);
});
