var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/gymPass_dev');//database will be named gymPass_dev

app.use(express.static(__dirname + '/build'));
var gymPassRouter = require(__dirname + '/routes/gymPassRoutes');
var userRouter = require(__dirname + '/routes/usersRoutes');
app.use('/api', gymPassRouter);
app.use('/api', userRouter);

var port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log('server listening on port: ' + port);
});
