var http = require('http-request');
var Portfolio = require('../../db/models').Portfolio;
var request = require('request');
var Transaction = require('../../db/models').Transaction;
var Watchlist = require('../../db/models').Watchlist;

//yahoo finance query for all stocks in user's portfolios and watchlist
module.exports.query = function (req, res) {

  "use strict";

  var result = [];
  var stocks = req.body.stocks;
  var stockList = '';
  
  stocks.forEach(function (stock) {
    stockList += stock + '+';
  })
  stockList = stockList.slice(0,-1);

  http.get('http://finance.yahoo.com/d/quotes.csv?s=' + stockList + '&f=sc1p2a', function (err, response) {
    
    if (err) {
      res.status(500).send("There was an error: ", err);
    }

    var ask = response.buffer.toString().split('\n');
    ask.forEach(function (stock) {
      result.push(stock.split(','));
    })
    res.json(result);
  })
}

//find all user's portfolios
module.exports.getPortfolioId = function (req, res) {

  "use strict";

  var userId = req.body.id;
  var response = [];

  Portfolio.findAll({
    where: {
      userId: userId
    }
  })
  .then(function (portfolios) {
    portfolios.forEach(function (portfolio) {
      response.push(portfolio.id);
    })
    res.json(response);
  })
  .catch(function (err) {
    res.send("There was an error: ", err);
  });
}

//get all stocks from user's portfolios and watchlist
module.exports.getStocks = function (req,res) {

  "use strict";

  var companies = {};
  var results = [];
  var portfolioIds = req.body.ids;

  //find all transactions across all of users portfolios
  Transaction.findAll({
    where: {
      PortfolioId: {
        $in : portfolioIds
      }
    }
  })
  .then(function (transactions) {
    transactions.forEach(function (transaction) {
      companies[transaction.symbol] = transaction.shares
    })
    for(var company in companies){
      if(companies[company] > 0){
        results.push(company)
      }
    }
    res.json(results)
  })
  .catch(function (err) {
    res.send("There was an error: ", err);
  });
}
