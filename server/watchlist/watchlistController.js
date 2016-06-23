var Watchlist = require('../../db/models').Watchlist;
var http = require('http-request');

//Add to watchlist table
module.exports.addToWatchlist = function (req, res) {

"use strict";

var userid = parseInt(req.body.userid) ;
Watchlist.findOrCreate({ where: {
  symbol: req.body.symbol,
  UserId: userid
 }
})

.then(function (watchlist) {

  res.json(watchlist);

});
};

//retrieve watchlist from database
module.exports.getWatchlist = function (req,res) {

  "use strict";

  var userid = parseInt(req.params.userid);
  var obj={};

  Watchlist.findAll({where: { UserId: userid}})
  .then(function (list) {

    list.forEach(function (stock) {

      obj[stock.symbol] = stock.symbol;
    });
    res.json(obj);
  });
};

//update watchlist on database
module.exports.updateWatchlist = function (req,res) {

    "use strict";

    var watchlist = req.body;
    var results = [];
    var list ='';
    var stocks={};
  //req.body is array
  for(var i=0; i<watchlist.length; i++){
          list+=watchlist[i] + '+';
        }
        list= list.slice(0,-1);
        http.get('http://finance.yahoo.com/d/quotes.csv?s=' + list + '&f=saopp2mw', function (err, response) {
          var ask = response.buffer.toString().split('\n');
          ask.forEach(function (stock) {

            results.push(stock.split(','));
          })
          res.json(results);
      })
    }

//remove from watchlist table
module.exports.removeFromWatchlist = function (req,res) {

  "use strict";

  var userId = req.body.userid;
  var symbol = req.body.symbol;

  Watchlist.findOne({where: {UserId: userId, symbol:symbol}})
  .then(function (stock) {

    stock.destroy()
  })
  .then(function (data) {

    res.json(data);

  })
}
