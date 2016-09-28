
(function(){
  
  "use strict";

  angular
    .module('app.recentTransactions', [])
    .controller('recentTransactionsController', recentTransactionsController);

    recentTransactionsController.$inject = ['transactionFactory', '$stateParams', 'leaderBoardFactory', '$rootScope'];

    function recentTransactionsController(transactionFactory, $stateParams, leaderBoardFactory, $rootScope) {

      var leagueId = $stateParams.leagueId;

      vm.portfolios =[];
      vm.transactions;
      vm.getleagueTransactions = getleagueTransactions;
      vm.getPortfolios = getPortfolios;

      //fetch all transactions in league by leagueid
      function getleagueTransactions(arr) {
    	  vm.transactions;
        transactionFactory.getleagueTransactions(arr)
        .then(function (transactions){
          vm.transactions = transactions;
        });
      }; 

      //to receive league ids;
      function getPortfolios() {
      	leaderBoardFactory.getPortfolios(leagueId)
      	  .then(function (portfolios) {
      	  	portfolios.forEach(function (portfolio) {
      	  		vm.portfolios.push({'PortfolioId': portfolio.id});
      	  	});

            //send array of objects to query using $OR
            vm.getleagueTransactions(vm.portfolios);
      	  });
      };
      $rootScope.$on('recentTrxn', function(){

        vm.getPortfolios();
      });

      vm.getPortfolios();
    }


    //reverse transactions so newest go first
    .filter('reverse', function() {
      return function(items) {
        return items.slice().reverse();
      };
    })

    //absolute all negative to positive, for # shares bougth/sold
    .filter('negative', function () {
       return function (items) {
        if(items <1){
          return Math.abs(items);
        }
        else{
          return Math.abs(items);
        }
      };
    })
})();
