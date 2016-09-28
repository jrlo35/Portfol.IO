(function () {

  "use strict";

  angular
    .module('app.ticker')
    .factory('TickerFactory', TickerFactory);
    
    TickerFactory.$inject = ['$http'];

	  function TickerFactory ($http) {
	  	var factory = {
	  		displayTicker: displayTicker,
		  	getAllUserStocks: getAllUserStocks,
		  	getAllPortfolioId: getAllPortfolioId,
		  	stocksQuery: stocksQuery
		  };
		  return factory;

		  function displayTicker (finalStocks) {
	      return finalStocks.slice();
		  }

		  function getAllPortfolioId (userId) {
	      return $http.post('/api/ticker/', {id: userId})
	        .then(getAllPortfolioIdComplete)
	        .catch(getAllPortfolioIdFailed);

	      function getAllPortfolioIdComplete (data) {
	        var usersPortfolios = data.data;
	        return usersPortfolios;
	      }
	      
	      function getAllPortfolioIdFailed (err) {
	      	console.error(err);
	      }
		  }

		  function getAllUserStocks (data) {
		  	return $http.post('/api/ticker/stocks', {ids: data})
		  	  .then(getAllUserStocksComplete)
		  	  .catch(getAllUserStocksFailed)

		  	function getAllUserStocksComplete (stocks) {
	        return stocks.data.map(function (stock) {
	        	return stock.toUpperCase();
	        });
		  	}

		  	function getAllUserStocksFailed (err){
	        console.error(err);
		  	}
		  }
	 
		  function stocksQuery (data) {
		  	return $http.post('/api/ticker/stockquote', {stocks: data})
		  	  .then(stocksQueryComplete)
		  	  .catch(stocksQueryFailed)

		  	function stocksQueryComplete (allStockInfo) {
	        allStockInfo.data.pop();
			  	return allStockInfo.data.map(function (stock) {
			  		return stock.map(function (result) {

			  			//round percent to two decimal places
			  			var parsedResult = result.replace(/\"/g,'');
		          if(/[\%]/.test(parsedResult)) {
		            var res = parsedResult.replace(/\%/,'');
		            var sign = res[0];
		            var decimal = res.substr(1);
		            var round = parseFloat(decimal).toFixed(2);
		            var final = sign + round.toString();
		            parsedResult = final.concat('%');
		          }
		          return parsedResult;
			  		});
			  	});
			  }
		  	function stocksQueryFailed (err) {
	        console.error(err);
		  	}
		  }
		};
})();
