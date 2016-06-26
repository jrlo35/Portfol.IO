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
	  		
	  }

	  function stocksQuery(data) {
	  	return $http.post('/api/ticker/stockquote', {stocks: data})
	  		
	  }
	  
	});
}()