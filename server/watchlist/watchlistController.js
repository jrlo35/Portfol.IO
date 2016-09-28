var Watchlist = require('../../db/models').Watchlist;
var http = require('http-request');

//Add to watchlist table
module.exports.addToWatchlist = function (req, res) {

  "use strict";

  var userId = parseInt(req.body.userid);
  Watchlist.findOrCreate({ 
    where: {symbol: req.body.symbol,
    UserId: userId
    }
  })
  .then(function (watchlist) {
    res.json(watchlist);
  })
  .catch(function (err) {
    res.send("There was an error: ", err);
  });
};

//retrieve watchlist from database
module.exports.getWatchlist = function (req, res) {

  "use strict";

  var userId = parseInt(req.params.userid);
  var userWatchlist = {};

  Watchlist.findAll({
    where: {
      UserId: userId
    }
  })
  .then(function (list) {
    list.forEach(function (stock) {
      userWatchlist[stock.symbol] = stock.symbol;
    });
    res.json(userWatchlist);
  })
  .catch(function (err) {
    res.send("There was an error: ", err);
  });
};

//update watchlist on database
module.exports.updateWatchlist = function (req, res) {

  "use strict";
  
  var listStocks = '';
  var results = [];
  var stocks = {};
  var watchlist = req.body;

  watchlist.forEach(function (stock) {
    listStocks += stock + '+';
  });

  listStocks = listStocks.slice(0,-1);

  http.get('http://finance.yahoo.com/d/quotes.csv?s=' + listStocks + '&f=saopp2mw', function (err, response) {

    if (err) {
      res.send("There was an error: ", err);
    }
    var ask = response.buffer.toString().split('\n');
    ask.forEach(function (stock) {
      results.push(stock.split(','));
    });
    res.json(results);
  });
};

//remove from watchlist table
module.exports.removeFromWatchlist = function (req, res) {

  "use strict";

  var userId = req.body.userid;
  var symbol = req.body.symbol;

  Watchlist.findOne({
    where: {
      UserId: userId, symbol: symbol
    }
  })
  .then(function (stock) {
    stock.destroy();
  })
  .then(function (data) {
    res.json(data);
  })
  .catch(function (err) {
    res.send("There was an error: ", err);
  });
};
