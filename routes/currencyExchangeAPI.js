var express = require('express');
var { mongoose } = require('mongoose');
var { latestCurrencyModel } = require('../schemas/currencySchema.js')
var { testFunction } = require('../serviceWorkers/currencyExchangeRatesAPI.js')
var router = express.Router();

/* GET latest currency rates. */
router.get('/latest', function(req, res, next) {
  
  const example = latestCurrencyModel({
    timestamp: 1611648000,
    base: "USD",
  })
  console.log(example.base)
  testFunction();
  example.save(function(err, exmaple) {
    if (err) { return console.log(err)}
  });
  
  res.json({
    "message": "reached currency api"
  });
});

module.exports = router;
