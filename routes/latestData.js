var express = require('express');
var { latestCurrencyModel } = require('../schemas/currencySchema.js')
var router = express.Router();

/* GET latest currency rates. */
router.get('/latest', function(req, res, next) {
  latestCurrencyModel.find(function (err, currencyData) {
    if (err) {return console.error(err)}
    res.json({
      "message": `${currencyData}`
    })
  })
});

module.exports = router;
