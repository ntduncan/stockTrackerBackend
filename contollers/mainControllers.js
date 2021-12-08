const axios = require("axios");
const finnhub = require('finnhub');

const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = process.env.FINNHUB_API_KEY;
const finnhubClient = new finnhub.DefaultApi()

const getOneStock = (req, res) => {
    const lastWeek = new Date(Date.now() - (7 * 24 * 3600 * 1000));
    const today = new Date();

    const startDate = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
    const endDate = `${lastWeek.getFullYear()}-${lastWeek.getMonth()}-${lastWeek.getDate()}`;

    let package = {}

    // Get Stock Price Info
    finnhubClient.quote(req.body.ticker, (error, data, response) => {
        package = {
            ticker: req.body.ticker, 
            currentPrice: data.c,
            openingPrice: data.o,
            previousClosePrice: data.pc}

            // Get News
            finnhubClient.companyNews(req.body.ticker, startDate, endDate, (error, news, response) => {
                package.companyNews = news.slice(1,11);
                console.log(news)
                res.json(package);
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
                    currentPrice: data.c,
                    openingPrice: data.o,
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