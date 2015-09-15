var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/notes_dev');

//middleware will allow for validation

//apply a min and max validation number. Budget.  If exceeds min, fails
// make function to subtract out money from object to see min Budget