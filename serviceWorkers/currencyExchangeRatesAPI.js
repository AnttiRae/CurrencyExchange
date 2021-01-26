var axios = require('axios');
const { response } = require('../app');

const testFunction = (base="USD") => {
    axios.get('https://openexchangerates.org/api/latest.json', {
        params: {
            app_id: process.env.APP_ID,
            base: base
        }
    }).then(function (response){
        console.log(response.data)

    }).catch(function (error) {
        console.log(error);
    })
}


module.exports.testFunction = testFunction;
