'use strict';
const axios = require('axios')
const fs = require('fs')
const async = require('async')

const apiUrl = 'https://free.currencyconverterapi.com/api/v6/'
const apiKey = '2c07602b107024c25671';

async function fx(firstCurrency, secondCurrency='NGN') {
  let encodeFistCurrency = encodeURIComponent(`${firstCurrency}_NGN`)
  let encodeSecondCurrency = encodeURIComponent(`${secondCurrency}_NGN`)
  let query = `${encodeFistCurrency},${encodeSecondCurrency}`
  const url = `${apiUrl}convert?q=${query}&apiKey=${apiKey}`
  return await axios.get(url)
  
}

module.exports.getfx = (event, context) => {
  let currenciesData = JSON.parse((fs.readFileSync('supported-currencies.json')))
  let flattenedCurruencies = Object.entries(currenciesData.results).map(item => item[0]).reduce(
    function(ac, cv) {
      if (ac.length){
        let lastitem = ac[ac.length -1]
        if (lastitem.length < 2) {
          lastitem.push(cv)
          ac[ac.length -1] = lastitem
        } else {
          ac.push([cv])
        }
      } else {
        ac.push([cv])
      }
    
      return ac
    }, []
  )
  function conversionBuilder(currency) {
    return function(callback) {
      fx(...currency)
      .then(res => {
        let { data } = res
        callback(null, data.results)
      })
      .catch(res => {
        let { response } = res
        callback(response.data, null)
      })     
    }
  }

  let fxQueryBuilder = flattenedCurruencies.map(conversionBuilder)
  async.parallel(fxQueryBuilder.slice(0, 100),
  (err, results) => {
    const reducer = (accumulator, currentValue) => {
      let fxRate = Object.entries(currentValue)
      accumulator.results[fxRate[0][0]] = fxRate[0][1]
      accumulator.results[fxRate[1][0]] = fxRate[1][1]
      return accumulator
    }
    let fxCollection = results.reduce(reducer, {"results": {}})
    !err ? fs.writeFileSync("fx.json", JSON.stringify(fxCollection, null, '\t')) : console.log(err)
  })
};

module.exports.getcurrencies = async (event, context) => {
  let url = `${apiUrl}currencies?apiKey=${apiKey}&compact=ultra`
  const { data } = await axios.get(url)
  const currencies = JSON.stringify(data, null, '\t')
  fs.writeFileSync("supported-currencies.json", currencies)
};

