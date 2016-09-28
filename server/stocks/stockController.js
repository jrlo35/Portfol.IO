var request = require('request');


//yahoo finance query
module.exports.getStock = function (req, res) {

  "use strict";
  var stockName = req.params.stockName;
  var query = "http://finance.yahoo.com/d/quotes.csv?s=" + stockName + "&f=c1p2aspot8va2j1yrn";

  request(query, function (err, stock) {
      var stockinfo = stock.body.split(',');
      var stockask = {Change: stockinfo[0],
              PercentChange: stockinfo[1].split('\"')[1],
              symbol: stockinfo[3].split('\"')[1],
              Ask: stockinfo[2],
              close: stockinfo[4],
              open: stockinfo[5],
              yrTarget: stockinfo[6],
              vol: stockinfo[7],
              avgVol: stockinfo[8],
              mrktCap: stockinfo[9],
              yield: stockinfo[10],
              pe: stockinfo[11],
              Name: stockinfo[12].split('\"')[1]};

      if (err) {
          throw err;
      }

    //sending the stock information
      res.send(stockask);
    });
};

//yahoo finance query for bottom bar search
module.exports.searchBar = function (req, res) {

  "use strict";
  var stockName = req.params.stockName;
  var query = "http://finance.yahoo.com/d/quotes.csv?s=" + stockName + "&f=sl1abp2v";

  request(query, function (err, stock) {
      var stockinfo = stock.body.split(',');
      var stockask = {
          LastTradePriceOnly: stockinfo[1],
          ChangeinPercent: stockinfo[4].split('\"')[1],
          Symbol: stockinfo[0].split('\"')[1],
          Ask: stockinfo[2],
          Bid: stockinfo[3],
          Volume: stockinfo[5]
      };

      if (err) {
          throw err;
      }

  //sending the stock information
      res.send(stockask);
  });
};