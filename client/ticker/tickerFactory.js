(function () {

  "use strict";

  angular
    .module('app');
		.factory('TickerFactory', TickerFactory);
    
  TickerFactory.$inject = ['$http'];

  function TickerFactory ($http) {

  	return {
	  	getAllUserStocks: getAllUserStocks,
	  	getAllPortfolioId: getAllPortfolioId,
	  	stocksQuery: stocksQuery
	  };

		function getAllPortfolioId(userID) {
      return $http.post('/api/ticker/', {id: userID})
        .then(getAllPortfolioIdComplete)
        .catch(getAllPortfolioIdFailed)

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

	  	function getAllUserStocksComplete() {

	  	}

	  	function getAllUserStocksFailed(err){
        console.error(err);
	  	}
	  		
	  }

	  function stocksQuery(data) {
	  	return $http.post('/api/ticker/stockquote', {stocks: data})
	  	  .then(stocksQueryComplete)
	  	  .catch(stocksQueryFailed)

	  	function stocksQueryComplete() {

	  	}

	  	function stocksQueryFailed(err) {
        console.error(err);
	  	}
	  		
	  }
	  
	});
}()