var Transaction = require('../../db/models').Transaction;
var moment = require('moment');


//get all league transactions for specific league
module.exports.getLeagueTransactionsfromDB = function (req, res) {
  "use strict";
  
  var portfolioId = req.body.data;
  var leagueTransactions = [];

  Transaction.findAll(
    {where: {
      $or: portfolioId
    }
  })
  .then(function (transactions) {
    transactions.forEach(function (transaction) {
      leagueTransactions.push({symbol: transaction.symbol.toUpperCase(), portfolioId: transaction.PortfolioId, buysell: transaction.shares, time: moment(transaction.createdAt).calendar()});
    });
    res.json(leagueTransactions);
  });
};