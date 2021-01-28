var express = require('express');
var { mongoose } = require('mongoose');
var { latestCurrencyModel } = require('../schemas/currencySchema.js')
var { retrieveLatestCurrencyData } = require('../serviceWorkers/currencyExchangeRatesAPI.js')
var router = express.Router();

/* GET latest currency rates. */
router.get('/latest', function(req, res, next) {
  retrieveLatestCurrencyData();
  res.json({
    "message": "reached currency api"
  });
});

module.exports = router;
