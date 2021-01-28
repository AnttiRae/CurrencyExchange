var axios = require('axios');
var { latestCurrencyModel } = require('../schemas/currencySchema.js')

/*
    Should be run every start of an hour
*/
const retrieveLatestCurrencyData = (base="USD") => {
    axios.get('https://openexchangerates.org/api/latest.json', {
        params: {
            app_id: process.env.APP_ID,
            base: base
        }
    }).then(function (response){
        const latestCurrencyData = latestCurrencyModel(response.data)
        latestCurrencyData.save((err, example) => {
            if (err) { return console.log(err)}
            else {console.log(example)}
        })

    }).catch(function (error) {
        console.log(error);
    })
}


module.exports.retrieveLatestCurrencyData = retrieveLatestCurrencyData;
