var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var schedule = require('node-schedule');
var { retrieveLatestCurrencyData } = require('./serviceWorkers/currencyExchangeRatesAPI.js');
require('dotenv').config();
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {
  console.log("Connected to MongoDB!");
})

var indexRouter = require('./routes/index');
var currencyExchangeAPIRouter = require('./routes/currencyExchangeAPI');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/currency-info/api', currencyExchangeAPIRouter);

/*
  SCHEDULER
*/
var j = schedule.scheduleJob('01 * * * *', function(){
  console.log('Retrieving latest currency data');
  retrieveLatestCurrencyData();
});

module.exports = app;
