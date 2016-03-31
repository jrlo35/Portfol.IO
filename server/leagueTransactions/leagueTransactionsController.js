var Portfolio = require('../../db/models').Portfolio;
var Transaction = require('../../db/models').Transaction;
var moment = require('moment')



//get all league transactions for specific league 
module.exports.getLeagueTransactionsfromDB = function (req,res) {

  	var portfolioid = req.body.data;
    var leagueTransactions = [];
      Transaction.findAll({ where: {
      $or: req.body.data
        }}).then(function(transactions){
        	transactions.forEach(function(transaction){
        		leagueTransactions.push({'symbol':transaction.symbol.toUpperCase(), 'portfolioid' : transaction.PortfolioId, 'buysell': transaction.shares, 'time': moment(transaction.createdAt).calendar()})
        	})
        	res.json(leagueTransactions);
    })
}