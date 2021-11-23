const axios = require("axios");
const finnhub = require('finnhub');

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = process.env.FINNHUB_API_KEY;
const finnhubClient = new finnhub.DefaultApi()

const getOneStock = (req, res) => {
    finnhubClient.quote(req.body.ticker, (error, data, response) => {
        res.json({
            ticker: ticker, 
            current: data.c,
            opening: data.o,
            previousClosePrice: data.pc,
        });
    });
}

const getManyStocks = (req, res) => {
    let tickerData = [];

    const getData = new Promise(resolve => {
        req.body.tickers.forEach(ticker => {
            finnhubClient.quote(ticker, (error, data, response) => {
                const formattedData = {
                    ticker: ticker, 
                    current: data.c,
                    opening: data.o,
                    previousClosePrice: data.pc,
                }
                tickerData.push(formattedData);
            })
        })
        
        resolve();
    })

    getData.then(() => {
        setTimeout(() => {res.json(tickerData)}, 1000)
    })
}

module.exports = {
    getOneStock,
    getManyStocks
}