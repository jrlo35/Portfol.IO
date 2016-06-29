(function () {

  "use strict";

  angular
    .module('app');
		.factory('TickerFactory', TickerFactory);
    
  TickerFactory.$inject = ['$http'];

  function TickerFactory($http) {
  	var tickerService = {
  		displayTicker: displayTicker,
	  	getAllUserStocks: getAllUserStocks,
	  	getAllPortfolioId: getAllPortfolioId,
	  	stocksQuery: stocksQuery
	  };
	  return tickerService;

	  function displayTicker(finalStocks) {
	  	var boxes = [];
	  	for(var i = 0; i < finalStocks.length; i++) {
        boxes.push(finalStocks[i]);
      }
      return boxes;
	  }

		function getAllPortfolioId(userID) {
      return $http.post('/api/ticker/', {id: userID})
        .then(getAllPortfolioIdComplete)
        .catch(getAllPortfolioIdFailed);

      function getAllPortfolioIdComplete(data) {
        var usersPortfolios = data.data;
        return usersPortfolios;
      }
      
      function getAllPortfolioIdFailed(err) {
      	console.error(err);
      }
	  }

	  function getAllUserStocks(data) {
	  	return $http.post('/api/ticker/stocks', {ids: data})
	  	  .then(getAllUserStocksComplete)
	  	  .catch(getAllUserStocksFailed)

	  	function getAllUserStocksComplete(stocks) {
	  		var userStocks = [];
	  		var allUserStocks = stocks.data;
        allUserStocks.forEach(function (stock) {
          userStocks.push(stock.toUpperCase());
	  	  })
	  	  return userStocks;
	  	}
	  	function getAllUserStocksFailed(err){
        console.error(err);
	  	}
	  }

	  function stocksQuery(data) {
	  	return $http.post('/api/ticker/stockquote', {stocks: data})
	  	  .then(stocksQueryComplete)
	  	  .catch(stocksQueryFailed)

	  	function stocksQueryComplete(allStockInfo) {
	  		var finalStocks = [];
	  		var parsedStocks = [];
        allStockInfo.data.pop();
        allStockInfo.data.forEach(function (stock) {
          stock.forEach(function (result) {
            var parsedResult = result.replace(/\"/g,'');
            if(/[\%]/.test(parsedResult)) {
              var res = parsedResult.replace(/\%/,'');
              var sign = res[0];
              var decimal = res.substr(1);
              var round = parseFloat(decimal).toFixed(2);
              var final = sign + round.toString();
              parsedResult = final.concat('%');
            }
            parsedStocks.push(parsedResult);
       	  })
          finalstocks.push(parsedStocks);
          parsedStocks = [];
        })
        return finalStocks;
	  	}

	  	function stocksQueryFailed(err) {
        console.error(err);
	  	}
	  }
	};
}()