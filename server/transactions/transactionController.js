var Transaction = require('../../db/models').Transaction;
var Portfolio = require('../../db/models').Portfolio;
var Order = require('../../db/models').Order;

// make a transaction
module.exports.buySell = function (req, res) {

    "use strict";
    
    Transaction.create(req.body).then(function (transaction) {

        Portfolio.findOne({where: {
            UserId: req.body.userId,
            leagueId: req.body.leagueId
        }})
            .then(function (portfolio) {

                if (!transaction.buysell) {
                    transaction.shares = -1 * transaction.shares;
                }

                var amount = transaction.price * transaction.shares;

                //amount is either subtracted or added to portfolioValue depending on if sold or bought
                portfolio.portfolioValue += amount;
                portfolio.balance -= (amount + 10);


                //Setting the transaction's PortfolioId
                transaction.PortfolioId = portfolio.id;

                //Incrementing number of trades
                portfolio.numOfTrades ++;

                //Setting the initial return
                transaction.return = 0;

                // Saving both instances
                transaction.save();
                portfolio.save();

                res.send(transaction);
            })
            .catch(function (err) {
                res.send('Error: ', err);
            });

    })
        .catch(function (err) {
            res.send('Error: ', err);
        });
};

//make a limit order
module.exports.limitOrder = function (req, res) {
    "use strict";
    Order.create(req.body).then(function (order) {

        Portfolio.findOne({where: {
            UserId: req.body.userId,
            leagueId: req.body.leagueId
        }})
            .then(function (portfolio) {

                //Setting the transaction's PortfolioId
                order.PortfolioId = portfolio.id;

                // Saving both instances
                order.save();
                portfolio.save();

                res.send(transaction);
            })
            .catch(function (err) {
                res.send('Error: ', err);
            });

    })
        .catch(function (err) {
            res.send('Error: ', err);
        });
};

//make a limit order
module.exports.getOrders = function (req, res) {
    "use strict";
    Portfolio.findOne({where: {
        userId: req.body.userId,
        leagueId: req.body.leagueId
    }})
        .then(function (portfolio) {
            Order.findAll({where: {portfolioId: portfolio.id}})
                .then(function (orders) {
                    if (!orders) {
                        res.send('No orders found!');
                    } else {
                        res.send(orders);
                    }
                })
                .catch(function (err) {
                    res.send('Error: ', err);
                });
        })
        .catch(function (err) {
            res.send('Error: ', err);
        });
};

module.exports.cancelOrder = function (req, res) {
    "use strict";
    Order.destroy({where: {id: req.body.id}})
        .then(function () {
            console.log("Succesfully canceld order");
            res.send("Succesfully canceld order");
        })
        .catch(function (err) {
            res.send('Error:', err);
        });
};



module.exports.getTransactions = function (req, res) {

    "use strict";
    Portfolio.findOne({where: {
        UserId: req.params.userId,
        leagueId: req.params.leagueId
    }}).then(function (portfolio) {

        Transaction.findAll({where: {
            PortfolioId: portfolio.id
        }}).then(function (transactions) {

            res.send(transactions);
        })
            .catch(function (err) {
                res.send("There was an error: ", err);
            });

    })
        .catch(function (err) {
            res.send("There was an error: ", err);
        });

};





