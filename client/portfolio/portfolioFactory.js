(function(){

  "use strict";
  
  angular
    .module('app')
    .factory('Portfolio', Portfolio)
    
    Portfolio.$inject = ['http'];

    function Portfolio($http){

      var factory = {
        getStock: getStock,
        buySell: buySell,
        getPortfolio: getPortfolio,
        getUserStocks: getUserStocks,
        updateUserStocks: updateUserStocks,
        limitOrder: limitOrder
      }

      return factory;

      function buySell(options){
        return $http({
          method: 'POST',
          url: '/api/transactions',
          data: options
        }).then(function(data){
          return data;
        })
      }

      function limitorder(options){
        return $http({
          method: 'POST',
          url: '/api/transactions/limitorder',
          data: options
        }).then(function(data){
          return data;
        })
      }

      function getStock(stockName){
        return $http({
          method: 'GET',
          url: '/api/stocks/'+stockName
        }).then(function(stock){
          return stock;
        })
      }

      function getPortfolio(leagueId, userId){
        return $http({
          method: 'GET',
          url: '/api/portfolios/'+leagueId+'/'+userId
        }).then(function(portfolio){
          return portfolio.data;
        })
      }

      function getUserStocks(leagueId, userId){
        return $http({
          method: 'GET',
          url: '/api/portfolios/stocks/'+leagueId+'/'+userId
        }).then(function(transactions){
          return transactions.data;
        })
      }

      function updateUserStocks(leagueId, userId){
        return $http({
          method: 'PUT',
          url: '/api/portfolios/stocks/'+leagueId+'/'+userId
        }).then(function(transactions){
          return transactions.data;
        });
      }
    }
})();
